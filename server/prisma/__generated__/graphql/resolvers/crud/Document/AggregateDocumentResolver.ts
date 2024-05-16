import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateDocumentArgs } from "./args/AggregateDocumentArgs";
import { Document } from "../../../models/Document";
import { AggregateDocument } from "../../outputs/AggregateDocument";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Document)
export class AggregateDocumentResolver {
    @TypeGraphQL.Query(_returns => AggregateDocument, {
            nullable: false
        })
    async aggregateDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateDocumentArgs): Promise<AggregateDocument> {
         return getPrismaFromContext(ctx).document.aggregate({
                      ...args,
                      ...transformInfoIntoPrismaArgs(info),
                    });
    }
}
