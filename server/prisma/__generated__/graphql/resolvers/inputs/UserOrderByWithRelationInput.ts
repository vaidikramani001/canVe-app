import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SortOrderInput } from "../inputs/SortOrderInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("UserOrderByWithRelationInput", {})
export class UserOrderByWithRelationInput {
    @TypeGraphQL.Field(_type => SortOrderInput, {
            nullable: true
        })
    email?: SortOrderInput | undefined;

    @TypeGraphQL.Field(_type => SortOrder, {
            nullable: true
        })
    id?: "asc" | "desc" | undefined;

    @TypeGraphQL.Field(_type => SortOrderInput, {
            nullable: true
        })
    password?: SortOrderInput | undefined;

    @TypeGraphQL.Field(_type => SortOrderInput, {
            nullable: true
        })
    phone_number?: SortOrderInput | undefined;

    @TypeGraphQL.Field(_type => SortOrder, {
            nullable: true
        })
    roles?: "asc" | "desc" | undefined;

    @TypeGraphQL.Field(_type => SortOrder, {
            nullable: true
        })
    username?: "asc" | "desc" | undefined;
}
