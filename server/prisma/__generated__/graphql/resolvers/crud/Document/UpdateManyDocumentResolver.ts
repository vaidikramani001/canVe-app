import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { UpdateManyDocumentArgs } from "./args/UpdateManyDocumentArgs";
import { Document } from "../../../models/Document";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Document)
export class UpdateManyDocumentResolver {
    @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
            nullable: false
        })
    async updateManyDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateManyDocumentArgs): Promise<AffectedRowsOutput> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.updateMany({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }
}
