import * as TypeGraphQL from "type-graphql";

export enum document_doc_status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
TypeGraphQL.registerEnumType(document_doc_status, {
      name: "document_doc_status",
      description: undefined,
    });
