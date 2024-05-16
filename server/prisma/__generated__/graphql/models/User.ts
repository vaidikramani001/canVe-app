import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";

@TypeGraphQL.ObjectType("User", {
        simpleResolvers: true
    })
export class User {
    @TypeGraphQL.Field(_type => String, {
            nullable: true
        })
    email?: string | null;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: false
        })
    id!: number;

    @TypeGraphQL.Field(_type => String, {
            nullable: true
        })
    password?: string | null;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: true
        })
    phone_number?: number | null;

    @TypeGraphQL.Field(_type => String, {
            nullable: false
        })
    roles!: string;

    @TypeGraphQL.Field(_type => String, {
            nullable: false
        })
    username!: string;
}
