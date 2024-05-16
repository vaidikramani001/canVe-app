import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumdepartment_listFilter } from "../inputs/NestedEnumdepartment_listFilter";
import { NestedEnumdepartment_listWithAggregatesFilter } from "../inputs/NestedEnumdepartment_listWithAggregatesFilter";
import { NestedIntFilter } from "../inputs/NestedIntFilter";
import { department_list } from "../../enums/department_list";

@TypeGraphQL.InputType("Enumdepartment_listWithAggregatesFilter", {})
export class Enumdepartment_listWithAggregatesFilter {
    @TypeGraphQL.Field(_type => department_list, {
            nullable: true
        })
    equals?: "STUDENT" | "CANADIAN_CITIZEN" | "HEALTH" | "TRAVELER" | "ENVIROMENTALIST" | "BUSINESSES" | "PROFESSIONAL" | undefined;

    @TypeGraphQL.Field(_type => [department_list], {
            nullable: true
        })
    in?: Array<"STUDENT" | "CANADIAN_CITIZEN" | "HEALTH" | "TRAVELER" | "ENVIROMENTALIST" | "BUSINESSES" | "PROFESSIONAL"> | undefined;

    @TypeGraphQL.Field(_type => [department_list], {
            nullable: true
        })
    notIn?: Array<"STUDENT" | "CANADIAN_CITIZEN" | "HEALTH" | "TRAVELER" | "ENVIROMENTALIST" | "BUSINESSES" | "PROFESSIONAL"> | undefined;

    @TypeGraphQL.Field(_type => NestedEnumdepartment_listWithAggregatesFilter, {
            nullable: true
        })
    not?: NestedEnumdepartment_listWithAggregatesFilter | undefined;

    @TypeGraphQL.Field(_type => NestedIntFilter, {
            nullable: true
        })
    _count?: NestedIntFilter | undefined;

    @TypeGraphQL.Field(_type => NestedEnumdepartment_listFilter, {
            nullable: true
        })
    _min?: NestedEnumdepartment_listFilter | undefined;

    @TypeGraphQL.Field(_type => NestedEnumdepartment_listFilter, {
            nullable: true
        })
    _max?: NestedEnumdepartment_listFilter | undefined;
}
