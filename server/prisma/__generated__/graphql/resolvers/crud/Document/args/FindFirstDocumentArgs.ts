import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DocumentOrderByWithRelationInput } from "../../../inputs/DocumentOrderByWithRelationInput";
import { DocumentWhereInput } from "../../../inputs/DocumentWhereInput";
import { DocumentWhereUniqueInput } from "../../../inputs/DocumentWhereUniqueInput";
import { DocumentScalarFieldEnum } from "../../../../enums/DocumentScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindFirstDocumentArgs {
    @TypeGraphQL.Field(_type => DocumentWhereInput, {
            nullable: true
        })
    where?: DocumentWhereInput | undefined;

    @TypeGraphQL.Field(_type => [DocumentOrderByWithRelationInput], {
            nullable: true
        })
    orderBy?: DocumentOrderByWithRelationInput[] | undefined;

    @TypeGraphQL.Field(_type => DocumentWhereUniqueInput, {
            nullable: true
        })
    cursor?: DocumentWhereUniqueInput | undefined;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: true
        })
    take?: number | undefined;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: true
        })
    skip?: number | undefined;

    @TypeGraphQL.Field(_type => [DocumentScalarFieldEnum], {
            nullable: true
        })
    distinct?: Array<"doc_type" | "id" | "doc_number" | "doc_status" | "userId" | "doc_url" | "department" | "bookmarked"> | undefined;
}
