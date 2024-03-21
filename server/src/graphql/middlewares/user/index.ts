import { user_role } from "prisma/prisma-client";
import { MiddlewareFn } from "type-graphql";
import { prismaClient } from "../../../../prisma/__generated__/client";
import {
  User_organization,
  User,
} from "../../../../prisma/__generated__/graphql";
import { MyContext } from "../../../types";

export const restrictUserMiddleware: MiddlewareFn<MyContext> = async (
  { root, context },
  next
) => {
  const result = (await next()) as User[];
  if (!context.user?.userId) {
    return [];
  }
  // const allowedUsers = await prismaClient.user_organization.groupBy({ by : ['slug', 'organization_id'], where : { user_id : 1 }, })
  const connectedUsers = await prismaClient.user.findMany({
    where: {
      user_organizations: {
        some: {
          organization: {
            user_organizations: {
              some: {
                user_id: context.user?.userId,
                role: {
                  in: [user_role.owner, user_role.admin],
                },
              },
            },
          },
        },
      },
    },
    select: { id: true },
  });
  // return result
  const allowedUsers = connectedUsers.map((i) => i.id);
  return result.filter(i=>allowedUsers.includes(i.id));
  // return result;
};

export const restrictUserOrgsMiddleware: MiddlewareFn<MyContext> = async (
  { root, context },
  next
) => {
  const result = (await next()) as User_organization[];
  const all_user_orgs = (root as User).user_organizations;
  const connectedOrgs = await prismaClient.user_organization.findMany({
    where: {
      organization: {
        user_organizations: { some: { user_id: context.user?.userId } },
      },
    },
    select: { id: true },
  });
  const allowedOrgs = connectedOrgs.map((i) => i.id);
  return result.filter((i) => allowedOrgs.includes(i.id));
};
