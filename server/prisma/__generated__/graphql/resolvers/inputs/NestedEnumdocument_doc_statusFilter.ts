import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { document_doc_status } from "../../enums/document_doc_status";

@TypeGraphQL.InputType("NestedEnumdocument_doc_statusFilter", {})
export class NestedEnumdocument_doc_statusFilter {
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

    @TypeGraphQL.Field(_type => NestedEnumdocument_doc_statusFilter, {
            nullable: true
        })
    not?: NestedEnumdocument_doc_statusFilter | undefined;
}
