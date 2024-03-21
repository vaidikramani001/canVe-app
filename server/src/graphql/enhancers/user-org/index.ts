import { user_role } from "@prisma/client";
import {
  ResolverActionsConfig,
} from "../../../../prisma/__generated__/graphql";
import { Authed } from "../../auth/authChecker";
import { ErrorMiddleware } from "../../middlewares/error";

// define the decorators config using generic ResolverActionsConfig<TModelName> type
export const userOrganizationActionsConfig: ResolverActionsConfig<"User_organization"> = {
  _all: [ErrorMiddleware, Authed(["*"])],
};
// // define the decorators config using generic ResolverActionsConfig<TModelName> type
// export const organizationRelationsConfig: RelationResolverActionsConfig<"Organization"> = {};
