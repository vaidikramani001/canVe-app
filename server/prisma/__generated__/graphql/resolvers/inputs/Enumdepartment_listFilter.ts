import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { NestedEnumdepartment_listFilter } from "../inputs/NestedEnumdepartment_listFilter";
import { department_list } from "../../enums/department_list";

@TypeGraphQL.InputType("Enumdepartment_listFilter", {})
export class Enumdepartment_listFilter {
  @TypeGraphQL.Field((_type) => department_list, {
    nullable: true,
  })
  equals?:
    | "STUDENT"
    | "CANADIAN_CITIZEN"
    | "HEALTH"
    | "TRAVELER"
    | "ENVIROMENTALIST"
    | "BUSINESSES"
    | "PROFESSIONAL"
    | undefined;

  @TypeGraphQL.Field((_type) => [department_list], {
    nullable: true,
  })
  in?:
    | Array<
        | "STUDENT"
        | "CANADIAN_CITIZEN"
        | "HEALTH"
        | "TRAVELER"
        | "ENVIROMENTALIST"
        | "BUSINESSES"
        | "PROFESSIONAL"
      >
    | undefined;

  @TypeGraphQL.Field((_type) => [department_list], {
    nullable: true,
  })
  notIn?:
    | Array<
        | "STUDENT"
        | "CANADIAN_CITIZEN"
        | "HEALTH"
        | "TRAVELER"
        | "ENVIROMENTALIST"
        | "BUSINESSES"
        | "PROFESSIONAL"
      >
    | undefined;

  @TypeGraphQL.Field((_type) => NestedEnumdepartment_listFilter, {
    nullable: true,
  })
  not?: NestedEnumdepartment_listFilter | undefined;
}
