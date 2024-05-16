import * as TypeGraphQL from "type-graphql";

export enum UserScalarFieldEnum {
    email = "email",
    id = "id",
    password = "password",
    phone_number = "phone_number",
    roles = "roles",
    username = "username"
}
TypeGraphQL.registerEnumType(UserScalarFieldEnum, {
      name: "UserScalarFieldEnum",
      description: undefined,
    });
