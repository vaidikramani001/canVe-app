import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DocumentAvgAggregate } from "../outputs/DocumentAvgAggregate";
import { DocumentCountAggregate } from "../outputs/DocumentCountAggregate";
import { DocumentMaxAggregate } from "../outputs/DocumentMaxAggregate";
import { DocumentMinAggregate } from "../outputs/DocumentMinAggregate";
import { DocumentSumAggregate } from "../outputs/DocumentSumAggregate";

@TypeGraphQL.ObjectType("AggregateDocument", {
        simpleResolvers: true
    })
export class AggregateDocument {
    @TypeGraphQL.Field(_type => DocumentCountAggregate, {
            nullable: true
        })
    _count!: DocumentCountAggregate | null;

    @TypeGraphQL.Field(_type => DocumentAvgAggregate, {
            nullable: true
        })
    _avg!: DocumentAvgAggregate | null;

    @TypeGraphQL.Field(_type => DocumentSumAggregate, {
            nullable: true
        })
    _sum!: DocumentSumAggregate | null;

    @TypeGraphQL.Field(_type => DocumentMinAggregate, {
            nullable: true
        })
    _min!: DocumentMinAggregate | null;

    @TypeGraphQL.Field(_type => DocumentMaxAggregate, {
            nullable: true
        })
    _max!: DocumentMaxAggregate | null;
}
