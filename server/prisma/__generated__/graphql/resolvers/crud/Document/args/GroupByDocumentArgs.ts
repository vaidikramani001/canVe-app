import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DocumentOrderByWithAggregationInput } from "../../../inputs/DocumentOrderByWithAggregationInput";
import { DocumentScalarWhereWithAggregatesInput } from "../../../inputs/DocumentScalarWhereWithAggregatesInput";
import { DocumentWhereInput } from "../../../inputs/DocumentWhereInput";
import { DocumentScalarFieldEnum } from "../../../../enums/DocumentScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByDocumentArgs {
    @TypeGraphQL.Field(_type => DocumentWhereInput, {
            nullable: true
        })
    where?: DocumentWhereInput | undefined;

    @TypeGraphQL.Field(_type => [DocumentOrderByWithAggregationInput], {
            nullable: true
        })
    orderBy?: DocumentOrderByWithAggregationInput[] | undefined;

    @TypeGraphQL.Field(_type => [DocumentScalarFieldEnum], {
            nullable: false
        })
    by!: Array<"doc_type" | "id" | "doc_number" | "doc_status" | "userId" | "doc_url" | "department" | "bookmarked">;

    @TypeGraphQL.Field(_type => DocumentScalarWhereWithAggregatesInput, {
            nullable: true
        })
    having?: DocumentScalarWhereWithAggregatesInput | undefined;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: true
        })
    take?: number | undefined;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: true
        })
    skip?: number | undefined;
}
