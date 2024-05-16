import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { IntNullableFilter } from "../inputs/IntNullableFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { UserWhereInput } from "../inputs/UserWhereInput";

@TypeGraphQL.InputType("UserWhereUniqueInput", {})
export class UserWhereUniqueInput {
    @TypeGraphQL.Field(_type => String, {
            nullable: true
        })
    email?: string | undefined;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: true
        })
    id?: number | undefined;

    @TypeGraphQL.Field(_type => String, {
            nullable: true
        })
    username?: string | undefined;

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
    password?: StringNullableFilter | undefined;

    @TypeGraphQL.Field(_type => IntNullableFilter, {
            nullable: true
        })
    phone_number?: IntNullableFilter | undefined;

    @TypeGraphQL.Field(_type => StringFilter, {
            nullable: true
        })
    roles?: StringFilter | undefined;
}
