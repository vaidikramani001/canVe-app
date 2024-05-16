import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { BoolFilter } from "../inputs/BoolFilter";
import { DocumentWhereInput } from "../inputs/DocumentWhereInput";
import { Enumdepartment_listFilter } from "../inputs/Enumdepartment_listFilter";
import { Enumdocument_doc_statusFilter } from "../inputs/Enumdocument_doc_statusFilter";
import { IntNullableFilter } from "../inputs/IntNullableFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("DocumentWhereUniqueInput", {})
export class DocumentWhereUniqueInput {
    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: true
        })
    id?: number | undefined;

    @TypeGraphQL.Field(_type => [DocumentWhereInput], {
            nullable: true
        })
    AND?: DocumentWhereInput[] | undefined;

    @TypeGraphQL.Field(_type => [DocumentWhereInput], {
            nullable: true
        })
    OR?: DocumentWhereInput[] | undefined;

    @TypeGraphQL.Field(_type => [DocumentWhereInput], {
            nullable: true
        })
    NOT?: DocumentWhereInput[] | undefined;

    @TypeGraphQL.Field(_type => StringNullableFilter, {
            nullable: true
        })
    doc_type?: StringNullableFilter | undefined;

    @TypeGraphQL.Field(_type => StringNullableFilter, {
            nullable: true
        })
    doc_number?: StringNullableFilter | undefined;

    @TypeGraphQL.Field(_type => Enumdocument_doc_statusFilter, {
            nullable: true
        })
    doc_status?: Enumdocument_doc_statusFilter | undefined;

    @TypeGraphQL.Field(_type => IntNullableFilter, {
            nullable: true
        })
    userId?: IntNullableFilter | undefined;

    @TypeGraphQL.Field(_type => StringNullableFilter, {
            nullable: true
        })
    doc_url?: StringNullableFilter | undefined;

    @TypeGraphQL.Field(_type => Enumdepartment_listFilter, {
            nullable: true
        })
    department?: Enumdepartment_listFilter | undefined;

    @TypeGraphQL.Field(_type => BoolFilter, {
            nullable: true
        })
    bookmarked?: BoolFilter | undefined;
}
