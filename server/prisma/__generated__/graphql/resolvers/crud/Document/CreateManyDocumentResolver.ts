import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { CreateManyDocumentArgs } from "./args/CreateManyDocumentArgs";
import { Document } from "../../../models/Document";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Document)
export class CreateManyDocumentResolver {
    @TypeGraphQL.Mutation(_returns => AffectedRowsOutput, {
            nullable: false
        })
    async createManyDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateManyDocumentArgs): Promise<AffectedRowsOutput> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.createMany({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }
}
