import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { prismaClient } from "../../prisma/__generated__/client";
import { Prisma, asset, log, trace, user } from "@prisma/client";
import { excludeNull, select } from "../helper";
import { FileUploadService } from "../services/file-upload-service";
import moment from "moment-timezone";
type exLog = Omit<log, "start_time" | "end_time" | "is_active"> & {
  startTime: number;
  endTime: number;
  isActive: boolean;
};
type exTrace = Omit<trace, "active_time" | "in_active_time" | "all_time"> & {
  activeTime: Prisma.Decimal;
  inActiveTime: Prisma.Decimal;
  allTime: Prisma.Decimal;
  images: asset[];
  logs: exLog[];
};
export class TraceController {
  // private em: EntityManager<IDatabaseDriver<Connection>>;
  constructor() {}
  private getImages = (images: asset[], name: string) => {
    return images.map((i: asset) => {
      let date = moment().toDate();
      try {
        date = moment(i.date).toDate();
      } catch (err) {}
      const fileUrl = FileUploadService.saveFile({
        file: String(i.url),
        fileName: `${moment(i.date).format("HH__mm__ss")}.png`,
        storageKey: name,
        storageName: `${moment(i.date).format("DD-MM-YYYY")}`,
      });
      return { url: fileUrl, date: date };
    });
  };

  private getTraces = async (traces: exTrace[], userOrgId: number, userId : number, orgId :  number) => {
    return await Promise.all(
      traces.map(async (i) => {
        let date = moment().hour(0).minute(0).second(0).millisecond(0).toDate();
        // console.log(
        //   moment()
        //     .hour(0)
        //     .minute(0)
        //     .second(0)
        //     .millisecond(0)
        //     .format("DD/MM/YYYY HH:mm:ss")
        // );
        const updatedObj: Pick<
          exTrace,
          "activeTime" | "inActiveTime" | "allTime"
        > = select(excludeNull(i), ["activeTime", "inActiveTime", "allTime"]);
        const createTraceArgs: Prisma.traceUpsertArgs["create"] = {
          active_time: updatedObj.activeTime,
          all_time: updatedObj.allTime,
          date,
          in_active_time: updatedObj.inActiveTime,
          user_organization_id: userOrgId,
          user_id : userId,
          organization_id : orgId,
          images: {
            createMany: { data: this.getImages(i.images, String(userOrgId)) },
          },
          logs: {
            createMany: {
              data: i.logs.map((log) => ({
                start_time: moment.unix(log.startTime).toDate(),
                end_time: moment.unix(log.endTime).toDate(),
                is_active: log.isActive,
                status: log.status,
              })),
            },
          },
        };
        const updateTraceArgs: Prisma.traceUpsertArgs["update"] = {
          active_time: { increment: updatedObj.activeTime },
          all_time: { increment: updatedObj.allTime },
          in_active_time: { increment: updatedObj.inActiveTime },
          images: {
            createMany: { data: this.getImages(i.images, String(userOrgId)) },
          },
        };
        const updated_trace = await prismaClient.trace.upsert({
          create: createTraceArgs,
          update: updateTraceArgs,
          where: { user_organization_id_date: { date, user_organization_id: userOrgId } },
        });
        i.logs.map((log) => ({
          create: {
            start_time: moment.unix(log.startTime).toDate(),
            end_time: moment.unix(log.endTime).toDate(),
            is_active: log.isActive,
            status: log.status,
          },
          update: {
            end_time: moment.unix(log.endTime).toDate(),
          },
          where: {
            AND: {
              start_time: { lt: moment.unix(log.startTime).toDate() },
              end_time: { lte: moment.unix(log.endTime).toDate() },
              is_active: log.isActive,
              status: log.status,
              trace_date: date,
            },
          },
        }));
        const _ = await Promise.all(
          i.logs.map(async (log) => {
            const toBeUpdatedLog = await prismaClient.log.findFirst({
              where: {
                AND: {
                  start_time: { lte: moment.unix(log.startTime).toDate() },
                  end_time: {
                    gte: moment
                      .unix(log.startTime)
                      .subtract(1, "seconds")
                      .toDate(),
                  },
                  is_active: log.isActive,
                  status: log.status,
                  trace_id: updated_trace.id,
                },
              },
            });
            let updatedLog;
            if (toBeUpdatedLog) {
              updatedLog = await prismaClient.log.update({
                data: {
                  end_time: moment.unix(log.endTime).toDate(),
                },
                where: {
                  id: toBeUpdatedLog.id,
                },
              });
            } else {
              updatedLog = await prismaClient.log.create({
                data: {
                  start_time: moment.unix(log.startTime).toDate(),
                  end_time: moment.unix(log.endTime).toDate(),
                  is_active: log.isActive,
                  status: log.status,
                  trace_id: updated_trace.id,
                },
              });
            }
            return !!updatedLog;
          })
        );
        return updated_trace;
      })
    );
  };
  submit: RequestHandler<
    {},
    string,
    Pick<user, "username" | "password"> & { trace: exTrace[]; org_id: number }
  > = async (req, res) => {
    console.log("Received put request");
    try {
      // const {id} = req.params;

      const user = req.body;
      if (!user.password) {
        return res.status(401).send("Please provide a valid password.");
      }
      const userFound = await prismaClient.user.findUnique({
        where: { username: user.username },
      });
      const isPasswordValid = await bcrypt.compare(
        user.password,
        userFound!.password
      );
      if (!userFound || (userFound && !isPasswordValid)) {
        return res.status(401).send("Invalid credentials!");
      }
      const userOrgFound = await prismaClient.user_organization.findUnique({
        where: { user_id_organization_id : { user_id: userFound.id, organization_id : user.org_id }  },
      });
      if(!userOrgFound){
        return res.status(401).send("Invalid organization!");
      }
      const traces = await this.getTraces(user.trace, userOrgFound.id, userFound.id, user.org_id );
      const updatedUser = await prismaClient.user_organization.update({
        data: {
          traces : { connect : traces}
        },
        where: { user_id_organization_id: {user_id : userFound.id, organization_id : user.org_id } },
      });
      if (!!updatedUser) {
        return res.status(200).send("Data updated successfully");
      }
      return res.status(200).send("Data updated successfully");
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send(`Server error occurred: ${(err as Error).message}`);
    }

    // return res.send("User has been updated successfully");
  };
}
