import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.ObjectType("DocumentSumAggregate", {
        simpleResolvers: true
    })
export class DocumentSumAggregate {
    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: true
        })
    id!: number | null;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: true
        })
    userId!: number | null;
}
