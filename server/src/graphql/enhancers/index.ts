import {
  RelationResolversEnhanceMap,
  ResolversEnhanceMap,
  applyRelationResolversEnhanceMap,
  applyResolversEnhanceMap,
} from "../../../prisma/__generated__/graphql";
import { organizationActionsConfig } from "./orgs";
import { userActionsConfig, userRelationsConfig } from "./user";
import { userOrganizationActionsConfig } from "./user-org";
export const enhanceResolvers = () => {
  // join the actions config into a single resolvers enhance object
  const resolversEnhanceMap: ResolversEnhanceMap = {
    User: userActionsConfig,
    Organization : organizationActionsConfig,
    User_organization : userOrganizationActionsConfig
  };
  const relationResolversEnhanceMap: RelationResolversEnhanceMap = {
    User: userRelationsConfig,
  };
  applyResolversEnhanceMap(resolversEnhanceMap);
  applyRelationResolversEnhanceMap(relationResolversEnhanceMap)
  return
};

