import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { document_doc_status } from "../../enums/document_doc_status";

@TypeGraphQL.InputType("Enumdocument_doc_statusFieldUpdateOperationsInput", {})
export class Enumdocument_doc_statusFieldUpdateOperationsInput {
    @TypeGraphQL.Field(_type => document_doc_status, {
            nullable: true
        })
    set?: "ACTIVE" | "INACTIVE" | undefined;
}
