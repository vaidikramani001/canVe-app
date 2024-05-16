import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DocumentAvgOrderByAggregateInput } from "../inputs/DocumentAvgOrderByAggregateInput";
import { DocumentCountOrderByAggregateInput } from "../inputs/DocumentCountOrderByAggregateInput";
import { DocumentMaxOrderByAggregateInput } from "../inputs/DocumentMaxOrderByAggregateInput";
import { DocumentMinOrderByAggregateInput } from "../inputs/DocumentMinOrderByAggregateInput";
import { DocumentSumOrderByAggregateInput } from "../inputs/DocumentSumOrderByAggregateInput";
import { SortOrderInput } from "../inputs/SortOrderInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("DocumentOrderByWithAggregationInput", {})
export class DocumentOrderByWithAggregationInput {
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

    @TypeGraphQL.Field(_type => DocumentCountOrderByAggregateInput, {
            nullable: true
        })
    _count?: DocumentCountOrderByAggregateInput | undefined;

    @TypeGraphQL.Field(_type => DocumentAvgOrderByAggregateInput, {
            nullable: true
        })
    _avg?: DocumentAvgOrderByAggregateInput | undefined;

    @TypeGraphQL.Field(_type => DocumentMaxOrderByAggregateInput, {
            nullable: true
        })
    _max?: DocumentMaxOrderByAggregateInput | undefined;

    @TypeGraphQL.Field(_type => DocumentMinOrderByAggregateInput, {
            nullable: true
        })
    _min?: DocumentMinOrderByAggregateInput | undefined;

    @TypeGraphQL.Field(_type => DocumentSumOrderByAggregateInput, {
            nullable: true
        })
    _sum?: DocumentSumOrderByAggregateInput | undefined;
}
