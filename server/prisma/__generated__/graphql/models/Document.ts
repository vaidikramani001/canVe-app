import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { department_list } from "../enums/department_list";
import { document_doc_status } from "../enums/document_doc_status";

@TypeGraphQL.ObjectType("Document", {
        simpleResolvers: true
    })
export class Document {
    @TypeGraphQL.Field(_type => String, {
            nullable: true
        })
    doc_type?: string | null;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: false
        })
    id!: number;

    @TypeGraphQL.Field(_type => String, {
            nullable: true
        })
    doc_number?: string | null;

    @TypeGraphQL.Field(_type => document_doc_status, {
            nullable: false
        })
    doc_status!: "ACTIVE" | "INACTIVE";

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
            nullable: true
        })
    userId?: number | null;

    @TypeGraphQL.Field(_type => String, {
            nullable: true
        })
    doc_url?: string | null;

    @TypeGraphQL.Field(_type => department_list, {
            nullable: false
        })
    department!: "STUDENT" | "CANADIAN_CITIZEN" | "HEALTH" | "TRAVELER" | "ENVIROMENTALIST" | "BUSINESSES" | "PROFESSIONAL";

    @TypeGraphQL.Field(_type => Boolean, {
            nullable: false
        })
    bookmarked!: boolean;
}
