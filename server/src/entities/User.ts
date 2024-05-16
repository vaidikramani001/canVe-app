import { ArrayType, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Role } from "../types";
// @ObjectType()
// @Entity()
// export class User {
//   @Field()
//   @PrimaryKey()
//   id!: number;

//   @Field(() => String, { nullable: true })
//   @Property({ type: "date" })
//   createdAt? = new Date();

//   @Field(() => String, { nullable: true })
//   @Property({ type: "date", onUpdate: () => new Date() })
//   updatedAt? = new Date();

//   @Field()
//   @Property({ type: "text", unique: true })
//   username!: string;

//   // @Property({ type: "text" })
//   // password!: string;
//   @Field(() => String, { nullable: true })
//   @Property({ type: "text", nullable: true })
//   password?: string | null;

//   // @Field(()=>[String], {nullable : true})
//   // @Property({ type: ArrayType })
//   // roles?: Role[] = ["USER"];
//   @Field(() => [String], { nullable: true })
//   @Property({ type: ArrayType, nullable: true })
//   roles?: Role[] | null | string = ["USER"];
// }
