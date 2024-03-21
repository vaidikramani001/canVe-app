import { MikroORM, wrap } from "@mikro-orm/core";
import mikroOrmConfig from "../src/mikro-orm.config";
import { User } from "../src/entities/User";

export const run_scratchpad = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);

  const users = await orm.em.find(User, { username: { $ne: "admin" } });

  for (const user of users) {
    wrap(user).assign({
      roles: user.username == "dev" ? ["PREMIUM_USER"] : ["USER"],
    });
    orm.em.persist(user);
  }

  await orm.em.flush();
};
