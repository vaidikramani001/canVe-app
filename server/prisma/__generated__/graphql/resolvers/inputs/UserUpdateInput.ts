import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("UserUpdateInput", {})
export class UserUpdateInput {
    @TypeGraphQL.Field(_type => String, {
            nullable: true
        })
    email?: string | undefined;

    @TypeGraphQL.Field(_type => String, {
            nullable: true
        })
    password?: string | undefined;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: true
        })
    phone_number?: number | undefined;

    @TypeGraphQL.Field(_type => String, {
            nullable: true
        })
    roles?: string | undefined;

    @TypeGraphQL.Field(_type => String, {
            nullable: true
        })
    username?: string | undefined;
}
