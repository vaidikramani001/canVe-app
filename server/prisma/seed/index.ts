import { MikroORM } from "@mikro-orm/core";
import { User } from "../../src/entities/User";
import mikroOrmConfig from "../../src/mikro-orm.config";
import { prismaClient } from "../__generated__/client";
// import loader from "../../global-helpers/loader";
import moment from "moment-timezone";
let count = 0;
const main = async (callback: () => Promise<boolean>) => {
  if (!(await callback())) {
    return;
  }
  // const orm = await MikroORM.init(mikroOrmConfig);
  // const em = orm.em;
  // Fetch all traces from the database
  const users = await prismaClient.user.find(
    User,
    {},
    { populate: ["trace", "trace.logs", "trace.images", "trace.parts"] }
  );
  const oneWeekAgo = moment().subtract(7, "day").toDate();
  const _ = await Promise.all(
    users.map(async (user) => {
      console.log(
        `[Info] : Started migration for user ${user.name} (${user.username} , ${user.id})`
      );
      const newUser = await prismaClient.user.create({
        data: {
          password: user.password,
          username: user.username,
          id: user.id,
          name: user.name,
        },
      });
      if (newUser) {
        console.log(
          `[Info] : Successfully migrated ${user.name} (${user.username} , ${user.id}) to new db.`
        );
        count++;
        return true;
      }
      return false;
    })
  );
  if (_) {
    console.log(`[Info] : Successfully migrated ${count} users to new db.`);
  }
  return;
};
const loaderInterval = loader();
/**
 * Check if no user exits in database
 */
main(async () => prismaClient.user.findMany({}).then((res) => res.length < 1))
  .then(async () => {
    await prismaClient.$disconnect();
    clearInterval(loaderInterval);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.exit();
  })
  .catch(async (err) => {
    await prismaClient.$disconnect();
    clearInterval(loaderInterval);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    console.log(err);
    process.exit(1);
  });











