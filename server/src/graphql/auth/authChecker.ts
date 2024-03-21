import {
  Args,
  ArgsType,
  AuthChecker,
  Authorized,
  Field,
  createMethodDecorator,
} from "type-graphql";
// import { User } from "../../../entities/User";
import { MyContext } from "../../types";
// import { user_role } from "@prisma/client";
import { TokenService } from "../../services/token-service";
export { Authorized as Authed } from "type-graphql";

// create auth checker function
export const authChecker: AuthChecker<MyContext> = async (
  { context: { prisma, token } },
  roles
) => {
  // // console.log(token)
  // return true;
  const userFromToken = await TokenService.verifyToken(
    token ?? "",
    "accessToken"
  );

  const user = userFromToken
    ? await prisma.user.findUnique({
        where: { id: userFromToken.userId },
      })
    : null;
  if (roles.length === 0) {
    // if `@Authorized()`, check only if user exists
    return !!user;
  }
  // there are some roles defined now

  if (roles.includes("*")) {
    return !!user;
  }
  if (!user) {
    // and if no user, restrict access
    return false;
  }
  // const allowed_roles = roles
  //   .map((i) => user_role[i as keyof typeof user_role])
  //   .filter((i) => !!i);
  const count = await prisma.user.count({
    where: {

    },
  });
  return count > 0;
};