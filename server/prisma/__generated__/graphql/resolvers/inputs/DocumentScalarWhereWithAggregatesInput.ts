import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolWithAggregatesFilter } from "../inputs/BoolWithAggregatesFilter";
import { Enumdepartment_listWithAggregatesFilter } from "../inputs/Enumdepartment_listWithAggregatesFilter";
import { Enumdocument_doc_statusWithAggregatesFilter } from "../inputs/Enumdocument_doc_statusWithAggregatesFilter";
import { IntNullableWithAggregatesFilter } from "../inputs/IntNullableWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";

@TypeGraphQL.InputType("DocumentScalarWhereWithAggregatesInput", {})
export class DocumentScalarWhereWithAggregatesInput {
    @TypeGraphQL.Field(_type => [DocumentScalarWhereWithAggregatesInput], {
            nullable: true
        })
    AND?: DocumentScalarWhereWithAggregatesInput[] | undefined;

    @TypeGraphQL.Field(_type => [DocumentScalarWhereWithAggregatesInput], {
            nullable: true
        })
    OR?: DocumentScalarWhereWithAggregatesInput[] | undefined;

    @TypeGraphQL.Field(_type => [DocumentScalarWhereWithAggregatesInput], {
            nullable: true
        })
    NOT?: DocumentScalarWhereWithAggregatesInput[] | undefined;

    @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
            nullable: true
        })
    doc_type?: StringNullableWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
            nullable: true
        })
    id?: IntWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
            nullable: true
        })
    doc_number?: StringNullableWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => Enumdocument_doc_statusWithAggregatesFilter, {
            nullable: true
        })
    doc_status?: Enumdocument_doc_statusWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => IntNullableWithAggregatesFilter, {
            nullable: true
        })
    userId?: IntNullableWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
            nullable: true
        })
    doc_url?: StringNullableWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => Enumdepartment_listWithAggregatesFilter, {
            nullable: true
        })
    department?: Enumdepartment_listWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => BoolWithAggregatesFilter, {
            nullable: true
        })
    bookmarked?: BoolWithAggregatesFilter | undefined;
}
