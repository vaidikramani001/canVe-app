import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { department_list } from "../../enums/department_list";

@TypeGraphQL.InputType("Enumdepartment_listFieldUpdateOperationsInput", {})
export class Enumdepartment_listFieldUpdateOperationsInput {
    @TypeGraphQL.Field(_type => department_list, {
            nullable: true
        })
    set?: "STUDENT" | "CANADIAN_CITIZEN" | "HEALTH" | "TRAVELER" | "ENVIROMENTALIST" | "BUSINESSES" | "PROFESSIONAL" | undefined;
}
