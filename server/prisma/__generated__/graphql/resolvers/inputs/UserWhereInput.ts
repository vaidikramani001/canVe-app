import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { IntFilter } from "../inputs/IntFilter";
import { IntNullableFilter } from "../inputs/IntNullableFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("UserWhereInput", {})
export class UserWhereInput {
    @TypeGraphQL.Field(_type => [UserWhereInput], {
            nullable: true
        })
    AND?: UserWhereInput[] | undefined;

    @TypeGraphQL.Field(_type => [UserWhereInput], {
            nullable: true
        })
    OR?: UserWhereInput[] | undefined;

    @TypeGraphQL.Field(_type => [UserWhereInput], {
            nullable: true
        })
    NOT?: UserWhereInput[] | undefined;

    @TypeGraphQL.Field(_type => StringNullableFilter, {
            nullable: true
        })
    email?: StringNullableFilter | undefined;

    @TypeGraphQL.Field(_type => IntFilter, {
            nullable: true
        })
    id?: IntFilter | undefined;

    @TypeGraphQL.Field(_type => StringNullableFilter, {
            nullable: true
        })
    password?: StringNullableFilter | undefined;

    @TypeGraphQL.Field(_type => IntNullableFilter, {
            nullable: true
        })
    phone_number?: IntNullableFilter | undefined;

    @TypeGraphQL.Field(_type => StringFilter, {
            nullable: true
        })
    roles?: StringFilter | undefined;

    @TypeGraphQL.Field(_type => StringFilter, {
            nullable: true
        })
    username?: StringFilter | undefined;
}
