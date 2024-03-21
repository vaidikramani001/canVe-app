require("dotenv").config();
import { MikroORM } from "@mikro-orm/core";
import { User } from "../src/entities/User";
import mikroConfig from "../src/mikro-orm.config";
import bcrypt from "bcrypt";
import { bycryptHashRounds } from "../src/constants";
export const create_super_user = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  const hashpassword = await bcrypt.hash("admin@#321", bycryptHashRounds);
  try {
    const preExistedUser = await orm.em.findOne(User, { username: "admin" });
    if (preExistedUser) {
      //   await updateUser(id);
      if (await shouldContinue()) {
        try {
          await orm.em.nativeUpdate(
            User,
            { id: preExistedUser.id },
            { password: hashpassword, roles : ["ADMIN"] }
          );
          console.info(
            '[INFO] Updated Superuser ( username : "admin", password : "admin@#321" )'
          );
        } catch (err) {
          console.info(
            '[ERROR] Creating Superuser ( username : "admin", password : "admin@#321" ):',
            err
          );
        }
      } else {
        console.log("[INFO] Operation CREATE SUPERUSER aborted by user.");
      }
      return;
    } else {
      const superuser = orm.em.create(User, {
        username: "admin",
        password: hashpassword,
        roles : ["ADMIN"]
      });
      await orm.em.persistAndFlush(superuser);
      console.info(
        '[INFO] Created Superuser ( username : "admin", password : "admin@#321" )'
      );
      return;
    }
  } catch (err) {
    console.info(
      '[ERROR] Creating Superuser ( username : "admin", password : "admin@#321" ):',
      err
    );
    return;
  }
};

const shouldContinue = async () =>
  new Promise((res) => {
    process.stdout.write(
      "User with username 'admin' already exists.\nWant to change password (y/n)?"
    );
    process.stdin.on("data", async function (data) {
      if (data?.toString().trim().toLowerCase() == "y") {
        process.stdin.end();
        res(true);
      } else {
        process.stdin.end();
        res(false);
      }
    });
  });
