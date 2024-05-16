import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateDocumentArgs } from "./args/AggregateDocumentArgs";
import { CreateManyDocumentArgs } from "./args/CreateManyDocumentArgs";
import { CreateOneDocumentArgs } from "./args/CreateOneDocumentArgs";
import { DeleteManyDocumentArgs } from "./args/DeleteManyDocumentArgs";
import { DeleteOneDocumentArgs } from "./args/DeleteOneDocumentArgs";
import { FindFirstDocumentArgs } from "./args/FindFirstDocumentArgs";
import { FindFirstDocumentOrThrowArgs } from "./args/FindFirstDocumentOrThrowArgs";
import { FindManyDocumentArgs } from "./args/FindManyDocumentArgs";
import { FindUniqueDocumentArgs } from "./args/FindUniqueDocumentArgs";
import { FindUniqueDocumentOrThrowArgs } from "./args/FindUniqueDocumentOrThrowArgs";
import { GroupByDocumentArgs } from "./args/GroupByDocumentArgs";
import { UpdateManyDocumentArgs } from "./args/UpdateManyDocumentArgs";
import { UpdateOneDocumentArgs } from "./args/UpdateOneDocumentArgs";
import { UpsertOneDocumentArgs } from "./args/UpsertOneDocumentArgs";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";
import { Document } from "../../../models/Document";
import { AffectedRowsOutput } from "../../outputs/AffectedRowsOutput";
import { AggregateDocument } from "../../outputs/AggregateDocument";
import { DocumentGroupBy } from "../../outputs/DocumentGroupBy";

@TypeGraphQL.Resolver(_of => Document)
export class DocumentCrudResolver {
    @TypeGraphQL.Query(_returns => AggregateDocument, {
            nullable: false
        })
    async aggregateDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateDocumentArgs): Promise<AggregateDocument> {
         return getPrismaFromContext(ctx).document.aggregate({
                      ...args,
                      ...transformInfoIntoPrismaArgs(info),
                    });
    }

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

    @TypeGraphQL.Mutation(_returns => Document, {
            nullable: false
        })
    async createOneDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateOneDocumentArgs): Promise<Document> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.create({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }

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

    @TypeGraphQL.Mutation(_returns => Document, {
            nullable: true
        })
    async deleteOneDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: DeleteOneDocumentArgs): Promise<Document | null> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.delete({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }

    @TypeGraphQL.Query(_returns => Document, {
            nullable: true
        })
    async findFirstDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindFirstDocumentArgs): Promise<Document | null> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.findFirst({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }

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

    @TypeGraphQL.Query(_returns => Document, {
            nullable: true
        })
    async document(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueDocumentArgs): Promise<Document | null> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.findUnique({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }

    @TypeGraphQL.Query(_returns => Document, {
            nullable: true
        })
    async getDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueDocumentOrThrowArgs): Promise<Document | null> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.findUniqueOrThrow({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }

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

    @TypeGraphQL.Mutation(_returns => Document, {
            nullable: true
        })
    async updateOneDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateOneDocumentArgs): Promise<Document | null> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.update({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }

    @TypeGraphQL.Mutation(_returns => Document, {
            nullable: false
        })
    async upsertOneDocument(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertOneDocumentArgs): Promise<Document> {
         const { _count } = transformInfoIntoPrismaArgs(info);
                    return getPrismaFromContext(ctx).document.upsert({
                      ...args,
                      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
                    });
    }
}
