import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("DocumentCountAggregate", {
        simpleResolvers: true
    })
export class DocumentCountAggregate {
    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: false
        })
    doc_type!: number;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: false
        })
    id!: number;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: false
        })
    doc_number!: number;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: false
        })
    doc_status!: number;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: false
        })
    userId!: number;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: false
        })
    doc_url!: number;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: false
        })
    department!: number;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: false
        })
    bookmarked!: number;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: false
        })
    _all!: number;
}
