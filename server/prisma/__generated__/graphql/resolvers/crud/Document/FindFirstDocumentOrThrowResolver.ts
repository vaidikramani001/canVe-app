import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { FindFirstDocumentOrThrowArgs } from "./args/FindFirstDocumentOrThrowArgs";
import { Document } from "../../../models/Document";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Document)
export class FindFirstDocumentOrThrowResolver {
    @TypeGraphQL.Query(_returns => Document, {
            nullable: true
        })
    async findFirstDocumentOrThrow(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstDocumentOrThrowArgs): Promise<Document | null> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.findFirstOrThrow({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }
}
