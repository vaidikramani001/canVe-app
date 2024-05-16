import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumdocument_doc_statusFilter } from "../inputs/NestedEnumdocument_doc_statusFilter";
import { NestedEnumdocument_doc_statusWithAggregatesFilter } from "../inputs/NestedEnumdocument_doc_statusWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { document_doc_status } from "../../enums/document_doc_status";

@TypeGraphQL.InputType("Enumdocument_doc_statusWithAggregatesFilter", {})
export class Enumdocument_doc_statusWithAggregatesFilter {
    @TypeGraphQL.Field(_type => document_doc_status, {
            nullable: true
        })
    equals?: "ACTIVE" | "INACTIVE" | undefined;

    @TypeGraphQL.Field(_type => [document_doc_status], {
            nullable: true
        })
    in?: Array<"ACTIVE" | "INACTIVE"> | undefined;

    @TypeGraphQL.Field(_type => [document_doc_status], {
            nullable: true
        })
    notIn?: Array<"ACTIVE" | "INACTIVE"> | undefined;

    @TypeGraphQL.Field(_type => NestedEnumdocument_doc_statusWithAggregatesFilter, {
            nullable: true
        })
    not?: NestedEnumdocument_doc_statusWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => NestedIntFilter, {
            nullable: true
        })
    _count?: NestedIntFilter | undefined;

    @TypeGraphQL.Field(_type => NestedEnumdocument_doc_statusFilter, {
            nullable: true
        })
    _min?: NestedEnumdocument_doc_statusFilter | undefined;

    @TypeGraphQL.Field(_type => NestedEnumdocument_doc_statusFilter, {
            nullable: true
        })
    _max?: NestedEnumdocument_doc_statusFilter | undefined;
}
