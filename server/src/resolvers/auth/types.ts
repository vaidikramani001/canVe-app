import { InputType, Field, ObjectType } from "type-graphql";
import { User } from "../../../prisma/__generated__/graphql";

@InputType()
export class UsernamePassWordInput {
  @Field({ nullable: true })
  redirectUrl?: string;
  @Field({ nullable: true })
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class ResponseError {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Boolean, { nullable: true })
  isSuccess?: boolean;

  @Field({ nullable: true })
  accessToken?: string;
}