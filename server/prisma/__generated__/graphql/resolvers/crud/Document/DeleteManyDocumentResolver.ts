import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { DeleteManyDocumentArgs } from "./args/DeleteManyDocumentArgs";
import { Document } from "../../../models/Document";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Document)
export class DeleteManyDocumentResolver {
    @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
            nullable: false
        })
    async deleteManyDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteManyDocumentArgs): Promise<AffectedRowsOutput> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.deleteMany({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }
}
