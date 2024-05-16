import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindManyDocumentArgs } from "./args/FindManyDocumentArgs";
import { Document } from "../../../models/Document";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Document)
export class FindManyDocumentResolver {
    @TypeGraphQL.Query(_returns => [Document], {
            nullable: false
        })
    async documents(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindManyDocumentArgs): Promise<Document[]> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.findMany({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }
}
