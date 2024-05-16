import * as TypeGraphQL from "type-graphql";

export enum department_list {
    STUDENT = "STUDENT",
    CANADIAN_CITIZEN = "CANADIAN_CITIZEN",
    HEALTH = "HEALTH",
    TRAVELER = "TRAVELER",
    ENVIROMENTALIST = "ENVIROMENTALIST",
    BUSINESSES = "BUSINESSES",
    PROFESSIONAL = "PROFESSIONAL"
}
TypeGraphQL.registerEnumType(department_list, {
      name: "department_list",
      description: undefined,
    });
