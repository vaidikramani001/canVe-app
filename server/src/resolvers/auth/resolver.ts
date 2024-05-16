import { MyContext } from "../../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import bcrypt from "bcryptjs";
import { DEFAULT_AUTH_REDIRECT_URL, bycryptHashRounds } from "../../constants";
import { TokenService } from "../../services/token-service";
import { User } from "../../../prisma/__generated__/graphql";
import { templates } from "../../templates";
import { UsernamePassWordInput, ResponseError, UserResponse } from "./types";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

@InputType()
class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
class LoginRes extends ResponseError {
  @Field({ nullable: true })
  accessToken?: string;
}

@InputType()
class PasswordResetInput {

  @Field()
  email: string;

  @Field()
  currentPassword: string;

  @Field()
  newPassword: string;

  @Field()
  confirmPassword: string;
}

@ObjectType()
class PasswordResetResponse extends ResponseError {
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { user }: MyContext): Promise<User | null> {
    if (!user) {
      return null;
    }
    const userFound = await prisma.user.findUnique({
      where: { id: user.userId },
    });

    return userFound;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePassWordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Userame must be atleast 3 characters long.",
          },
        ],
      };
    }
    if (options.password.length <= 6) {
      return {
        errors: [
          {
            field: "username",
            message: "Password must be atleast 6 characters long.",
          },
        ],
      };
    }
    const hashpassword = await bcrypt.hash(options.password, bycryptHashRounds);
    let user;
    const userFound = await prisma.user.findUnique({
      where: {
        username: options.username,
      },
    });
    const userEmailFound = await prisma.user.findUnique({
      where: {
        email: options.email,
      },
    });
    try {
      user = await prisma.user.create({
        data: {
          email: options.email,
          username: options.username,
          id: req.session.userId,
          roles: "USER",
          password: hashpassword,
        },
      });
      req.session.userId = user.id;
    } catch (err) {
      if (userFound) {
        return {
          errors: [
            {
              field: "username",
              message: "Username already taken.",
            },
          ],
        };
      }
      if (userEmailFound) {
        return {
          errors: [
            {
              field: "email",
              message: "user already exist.",
            },
          ],
        };
      }
    }
    return { user };
  }


  @Mutation(() => LoginRes)
  async login(
    @Arg("data") data: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    }); // User, { username: options.username }
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "Could not find the user!",
          },
        ],
      };
    }
    const valid = await bcrypt.compare(data.password, user.password); // invalid way
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect Password!",
          },
        ],
      };
    }
    if(user){
      const accessToken = TokenService.generateAccessToken({
        username: user.email,
        userId: user.id,
      });
      return {
        accessToken,
      };
    }
    return {
      user
    };
  }


  
  @Mutation(() => PasswordResetResponse)
  async resetPassword(
    @Arg("data") data: PasswordResetInput,
    @Ctx() { }: MyContext
  ): Promise<PasswordResetResponse> {
    try {
      const user = await prisma.user.findUnique({
        where: { email : data.email  },
      });
      if (!user) {
        return {
          errors: [{ message: "User not found." }],
        };
      }

      const passwordMatch = await bcrypt.compare(
        data.currentPassword,
        user.password
      );
      if (!passwordMatch) {
        return {
          errors: [{ field: "currentPassword", message: "Incorrect password." }],
        };
      }

      if (data.newPassword === data.currentPassword) {
        return {
          errors: [
            { field: "newPassword", message: "New password must be different from current password." },
          ],
        };
      }

      if (data.newPassword !== data.confirmPassword) {
        return {
          errors: [{ field: "confirmPassword", message: "Passwords do not match." }],
        };
      }

      const hashedPassword = await bcrypt.hash(data.newPassword, 10);

      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return {
        user,
      };
    } catch (error) {
      console.error("Error resetting password:", error);
      return {
        errors: [{ message: "Failed to reset password." }],
      };
    }
  }


}
  

