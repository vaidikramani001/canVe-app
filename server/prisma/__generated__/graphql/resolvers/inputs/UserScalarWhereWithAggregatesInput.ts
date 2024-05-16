import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { IntNullableWithAggregatesFilter } from "../inputs/IntNullableWithAggregatesFilter";
import { IntWithAggregatesFilter } from "../inputs/IntWithAggregatesFilter";
import { StringNullableWithAggregatesFilter } from "../inputs/StringNullableWithAggregatesFilter";
import { StringWithAggregatesFilter } from "../inputs/StringWithAggregatesFilter";

@TypeGraphQL.InputType("UserScalarWhereWithAggregatesInput", {})
export class UserScalarWhereWithAggregatesInput {
    @TypeGraphQL.Field(_type => [UserScalarWhereWithAggregatesInput], {
            nullable: true
        })
    AND?: UserScalarWhereWithAggregatesInput[] | undefined;

    @TypeGraphQL.Field(_type => [UserScalarWhereWithAggregatesInput], {
            nullable: true
        })
    OR?: UserScalarWhereWithAggregatesInput[] | undefined;

    @TypeGraphQL.Field(_type => [UserScalarWhereWithAggregatesInput], {
            nullable: true
        })
    NOT?: UserScalarWhereWithAggregatesInput[] | undefined;

    @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
            nullable: true
        })
    email?: StringNullableWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => IntWithAggregatesFilter, {
            nullable: true
        })
    id?: IntWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => StringNullableWithAggregatesFilter, {
            nullable: true
        })
    password?: StringNullableWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => IntNullableWithAggregatesFilter, {
            nullable: true
        })
    phone_number?: IntNullableWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
            nullable: true
        })
    roles?: StringWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => StringWithAggregatesFilter, {
            nullable: true
        })
    username?: StringWithAggregatesFilter | undefined;
}
