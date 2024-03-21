import { user_role } from "@prisma/client";
import {
  ResolverActionsConfig,
} from "../../../../prisma/__generated__/graphql";
import { Authed } from "../../auth/authChecker";
import { errorMiddlewares } from "../../middlewares";


// define the decorators config using generic ResolverActionsConfig<TModelName> type
export const organizationActionsConfig: ResolverActionsConfig<"Organization"> = {
  _all: [errorMiddlewares.ErrorMiddleware, Authed([user_role.admin])],
  createOneOrganization : ([errorBoundary, auth]) =>[errorBoundary, Authed()]
  // users: [UseMiddleware(restrictUserMiddleware)],
};
// // define the decorators config using generic ResolverActionsConfig<TModelName> type
// export const organizationRelationsConfig: RelationResolverActionsConfig<"Organization"> = {};
