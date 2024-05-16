import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { GroupByDocumentArgs } from "./args/GroupByDocumentArgs";
import { Document } from "../../../models/Document";
import { DocumentGroupBy } from "../../outputs/DocumentGroupBy";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Document)
export class GroupByDocumentResolver {
    @TypeGraphQL.Query(_returns => [DocumentGroupBy], {
            nullable: false
        })
    async groupByDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: GroupByDocumentArgs): Promise<DocumentGroupBy[]> {
         const { _count, _avg, _sum, _min, _max } = transformInfoIntoPrismaArgs(info);
         return getPrismaFromContext(ctx).document.groupBy({
                      ...args,
                      ...Object.fromEntries(
                        Object.entries({ _count, _avg, _sum, _min, _max }).filter(([_, v]) => v != null)
                      ),
                    });
    }
}
