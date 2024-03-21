import { MyContext, Role } from "../types";
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import bcrypt from "bcrypt";
import { COOKIE_NAME, bycryptHashRounds } from "../constants";
import { User } from "../../prisma/__generated__/graphql";
import { ResponseError, UserResponse } from "./auth/types";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

@InputType()
class UpdateUserInput {

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  phone_number?: number;

  @Field()
  email: string;

}

@ObjectType()
class UpdateUserRes extends ResponseError {
  @Field({ nullable: true })
  isSuccess?: Boolean;

  @Field(() => User, { nullable: true })
  user?: User;
  
}


@Resolver()
export class UserResolver {
  @Authorized<Role>(["ADMIN"])
  @Query(() => [User], { nullable: true })
  async users(@Ctx() {}: MyContext): Promise<User[] | null> {
    const users = await prisma.user.findMany();
    // console.log(users , "users")
    return users;
  }
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: { username: req.session.id },
    }); // User, { id: req.session.userId }
    return user;
  }

  @Query(() => User)
  async user(
    @Arg("data") data: UpdateUserInput,
    @Ctx() { em }: MyContext
  ): Promise<UpdateUserRes> {
    if (!data.email) {
      return {
        errors: [{ field: "email", message: "Please provide a username!" }],
      };
    }
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    // console.log(user,"user")
    if (!user) {
      return {
        errors: [
          { field: "email", message: "Please provide a valid username!" },
        ],
      };
    }
    return user;
  }

  @Mutation(() => UpdateUserRes)
  async updateUsers(
    @Arg("data") data: UpdateUserInput,
    @Ctx() {}: MyContext
  ): Promise<UpdateUserRes> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (user) {
        await prisma.user.update({
          where: {
            email: data.email,
          },
          data: {
            username: data.username,
            phone_number: data.phone_number,
          },
        });
        return {
          isSuccess: true,
          user
        };
      } else {
        return {
          isSuccess: false,
          errors: [
            {
              field: "email",
              message: "User not found!.",
            },
          ],
        };
      }
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        isSuccess: false,
      };
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
