import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SortOrderInput } from "../inputs/SortOrderInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("DocumentOrderByWithRelationInput", {})
export class DocumentOrderByWithRelationInput {
    @TypeGraphQL.Field(_type => SortOrderInput, {
            nullable: true
        })
    doc_type?: SortOrderInput | undefined;

    @TypeGraphQL.Field(_type => SortOrder, {
            nullable: true
        })
    id?: "asc" | "desc" | undefined;

    @TypeGraphQL.Field(_type => SortOrderInput, {
            nullable: true
        })
    doc_number?: SortOrderInput | undefined;

    @TypeGraphQL.Field(_type => SortOrder, {
            nullable: true
        })
    doc_status?: "asc" | "desc" | undefined;

    @TypeGraphQL.Field(_type => SortOrderInput, {
            nullable: true
        })
    userId?: SortOrderInput | undefined;

    @TypeGraphQL.Field(_type => SortOrderInput, {
            nullable: true
        })
    doc_url?: SortOrderInput | undefined;

    @TypeGraphQL.Field(_type => SortOrder, {
            nullable: true
        })
    department?: "asc" | "desc" | undefined;

    @TypeGraphQL.Field(_type => SortOrder, {
            nullable: true
        })
    bookmarked?: "asc" | "desc" | undefined;
}
