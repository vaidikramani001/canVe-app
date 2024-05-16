import { AuthChecker } from "type-graphql";
// import { User } from "../../entities/User";
import { MyContext } from "../../types";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// create auth checker function
export const authChecker: AuthChecker<MyContext> = async ({ context: { req } }, roles) => {
  const user = await prisma.user.findMany({ where: { id: req.session.userId } })
  return true
  if (roles.length === 0) {
    // if `@Authorized()`, check only if user exists
    return !!user
  }
  // there are some roles defined now

  if (roles.includes("*")) {
    return true
  }
  if (!user) {
    // and if no user, restrict access
    return false;
  }
  if (user.roles?.includes('ADMIN')) {
    return true
  }
  // if (user.roles?.some(role => roles.includes(role))) {
  //   // grant access if the roles overlap
  //   return true;
  // }
  const userRolesArray = user.roles.split(',');
  if (userRolesArray.some(role => roles.includes(role))) {
    // grant access if the roles overlap
    return true;
  }

  // no roles matched, restrict access
  return false;
};