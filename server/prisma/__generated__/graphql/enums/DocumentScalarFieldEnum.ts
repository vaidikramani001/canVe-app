import * as TypeGraphQL from "type-graphql";

export enum DocumentScalarFieldEnum {
    doc_type = "doc_type",
    id = "id",
    doc_number = "doc_number",
    doc_status = "doc_status",
    userId = "userId",
    doc_url = "doc_url",
    department = "department",
    bookmarked = "bookmarked"
}
TypeGraphQL.registerEnumType(DocumentScalarFieldEnum, {
      name: "DocumentScalarFieldEnum",
      description: undefined,
    });
