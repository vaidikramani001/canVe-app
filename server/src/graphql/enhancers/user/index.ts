import { user_role } from "@prisma/client";
import {
  RelationResolverActionsConfig,
  ResolverActionsConfig,
} from "../../../../prisma/__generated__/graphql";
import { Authed } from "../../auth/authChecker";
import { UseMiddleware } from "type-graphql";
import { userMiddlewares, errorMiddlewares } from "../../middlewares";

// define the decorators config using generic ResolverActionsConfig<TModelName> type
export const userActionsConfig: ResolverActionsConfig<"User"> = {
  _all: [errorMiddlewares.ErrorMiddleware, Authed(["*"])],
  users: [UseMiddleware(userMiddlewares.restrictUserMiddleware)],
};
// define the decorators config using generic ResolverActionsConfig<TModelName> type
export const userRelationsConfig: RelationResolverActionsConfig<"User"> = {
  user_organizations : [UseMiddleware(userMiddlewares.restrictUserOrgsMiddleware)]
};
