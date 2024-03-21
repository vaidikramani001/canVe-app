import { Prisma } from "prisma/prisma-client";
import { MiddlewareFn, UseMiddleware } from "type-graphql";
import { MyContext } from "../../../types";

const ErrorMiddlewareFn: MiddlewareFn<MyContext> = async (
  { root, context },
  next
) => {
  try {
    const result = await next();
    return result;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        e.message = `<b>${e.meta?.target}</b> must be unique.`;
      }
    }
    throw e;
  }
};

export const ErrorMiddleware = UseMiddleware(ErrorMiddlewareFn);