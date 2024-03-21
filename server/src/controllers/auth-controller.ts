import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import {
  Connection,
  IDatabaseDriver,
  EntityManager,
  RequiredEntityData,
} from "@mikro-orm/core";
// import { ACCESS_TOKEN_SECRET } from "../constants";
import jwt from "jsonwebtoken";
import { MailService } from "../services/mail-service";
import { prismaClient } from "../../prisma/__generated__/client";
import { TokenService } from "../services/token-service";
import { Prisma, account_status, user } from "@prisma/client";
export class AuthController {
  // private em: EntityManager<IDatabaseDriver<Connection>>;
  constructor() {}
  login: RequestHandler<
    {},
    string | { accessToken: string },
    { username: string; password: string }
  > = async (req, res) => {
    console.log("Received login request", req.body);
    try {
      const body = req.body;
      const userFound = await prismaClient.user.findUnique({
        where: {
          username: body.username,
          status : account_status.active
        },
      });
      if (userFound) {
        const valid = await bcrypt.compare(body.password, userFound.password);
        if (valid) {
          const accessToken = TokenService.generateAccessToken({
            username: userFound.username,
            userId: userFound.id,
            name: undefined,
            orgs: []
          });
          return res.status(200).send({ accessToken });
        }
        return res.status(401).send("Incorrect Password!");
      } else {
        return res.status(404).send("User not found!");
      }
    } catch (err) {
      return res.status(500).send(`Server error occurred: ${err.message}`);
    }
  };

  register: RequestHandler<{}, string, user> = async (req, res) => {
    console.log("Received user register request", req.body);
    try {
      const user = req.body;
      const userFound = await prismaClient.user.findUnique({
        where: {
          username: user.username,
        },
      });
      if (userFound) {
        return res.status(400).send("User exists already.");
      } else {
        const hashedPassword = await bcrypt.hash(user.password, 5);
        const userRequest: Prisma.userCreateArgs["data"] = {
          username: user.username,
          password: hashedPassword,
          name: user.name,
        };
        const _ = await prismaClient.user.create({ data: userRequest });
        return res.status(201).end();
      }
    } catch (err) {
      return res.status(500).send(`Server error occurred: ${err.message}`);
    }
  };

  forgotPassword: RequestHandler<{}, string, user & { redirectUrl: string }> =
    async (req, res) => {
      console.log("Received forgot password request", req.body);
      try {
        const user = req.body;
        const userFound = await prismaClient.user.findUnique({
          where: {
            username: user.username,
          },
        });
        if (userFound) {
          const resetPasswordToken = TokenService.generateResetPasswordToken({
            username: userFound.username,
            userId: userFound.id,
          });
          const targetUrl = new URL(user.redirectUrl);
          targetUrl.searchParams.append("token", resetPasswordToken);
          const mailService = new MailService();
          const isSuccess = await mailService.send({
            to: user.username, // list of receivers
            subject: "Reset Password", // Subject line
            html: `
              <table>
              <thead>
                <tr>
                  <th>Reset your password <a target="__blank" href="${targetUrl}">here.</a></th>
                </tr>
              </thead>
              </table>
            `, // html body
          });
          if (isSuccess) {
            return res.status(200).json("Mail sent successfully");
          } else {
            throw Error("Couldn't send mail");
          }
        } else {
          return res.status(404).send("User not found!");
        }
      } catch (err) {
        return res.status(500).send(`Server error occurred: ${err.message}`);
      }
    };

  resetPassword: RequestHandler<
    {},
    string,
    { token: string; password: string }
  > = async (req, res) => {
    console.log("Received reset password request", req.body);
    try {
      const { token, password } = req.body;
      const user = jwt.decode(token) as { username: string };
      if (!user) {
        return res.status(400).json("Invalid token!");
      }
      const userFound = await prismaClient.user.findUnique({
        where: {
          username: user.username,
        },
      });
      if (userFound) {
        const passwordHash = await bcrypt.hash(password, 5);
        const _ = await prismaClient.user.update({
          data: { password: passwordHash },
          where: { id: userFound.id },
        });
        return res.status(200).json("Password changed successfully");
      } else {
        return res.status(404).send("User not found!");
      }
    } catch (err) {
      return res
        .status(500)
        .send(`Server error occurred: ${(err as Error).message}`);
    }
  };
}
