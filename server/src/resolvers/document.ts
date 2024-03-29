import { MyContext } from "../types";
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
import { ResponseError } from "./auth/types";
import { PrismaClient } from '@prisma/client';
import { User } from "~/prisma/__generated__/graphql";

const prisma = new PrismaClient();

@InputType()
class CreateDocumentInput {
  @Field()
  doc_type: string;

  @Field({ nullable: true })
  doc_number?: string;

  @Field({ nullable: true })
  userId?: number;
}

@InputType()
class FindDocumentByUserInput {

  @Field({ nullable: true })
  userId?: number;

}


@ObjectType()
class Document {
  @Field(() => String)
  doc_type: string | null;

  @Field(() => String, { nullable: true })
  doc_number?: string | null;

  @Field()
  id: number;

  @Field({ nullable: true }) // it is null ( for update doc ) : null from all places
  userId?: number;

  @Field(() => String, { nullable: true })
  doc_status?: string | null;

  @Field({nullable:true})
  doc_url?: string;

  @Field()
  department: string;

  @Field()
  bookmarked: boolean;
}

@ObjectType()
class DocumentResponse extends ResponseError {
  @Field(() => Document, { nullable: true })
  document?: Document;
}

@Resolver()
export class DocumentResolver {

  @Mutation(() => DocumentResponse)
  async createDocument(
    @Arg("data") data: CreateDocumentInput,
    @Ctx() {}: MyContext
  ): Promise<DocumentResponse> {
    let createdDocument
    try {
     createdDocument = await prisma.document.create({
        data: {
          doc_type: data.doc_type,
          doc_number: data.doc_number,
          doc_status: "ACTIVE",
          userId : data.userId,
        },
      });
      // Construct a proper DocumentResponse object with the created document
      // return { document: createdDocument };
    } catch (error) {
      console.error("Error creating document:", error);
      return { errors: [{ field: "general", message: "Failed to create document." }] };
    }
    return { document: createdDocument };
  }
  

  @Query(() => [Document], { nullable: true })
  async documents(@Ctx() {}: MyContext): Promise<Document[] | null> {
    let documents
    try {
      documents = await prisma.document.findMany();
    } catch (error) {
      console.error("Error retrieving documents:", error);
      return null;
    }
    console.log(documents,"doc")
    return documents;
  }

  @Query(() => [Document], { nullable: true })
  async documentsByUserId(
    @Arg("data") data: FindDocumentByUserInput,
    @Ctx() {}: MyContext
  ): Promise<Document[] | null> {
    try {
      const documents = await prisma.document.findMany({
        where: {
          userId: data.userId,
        },
      });
      return documents;
    } catch (error) {
      console.error("Error retrieving documents by user ID:", error);
      return null;
    }
  }
  
  @Mutation(() => String)
  async verifyDocument(
    @Arg("data") data: string,
    @Arg("userId") userId: number, // New argument for the userId to update
    @Ctx() {}: MyContext
  ): Promise<string> {
    try {
      const document = await prisma.document.findFirst({
        where: {
          doc_number: data,
        },
      });
  
      if (document) {
        // If the document is found, update the userId
        const updatedDocument = await prisma.document.update({
          where: {
            id: document.id,
          },
          data: {
            userId: userId,
          },
        });
        
        if (updatedDocument) {
          return "Document is verified and userId updated successfully";
        } else {
          return "Document is verified but failed to update userId";
        }
      } else {
        return "Document not found or not verified";
      }
    } catch (error) {
      console.error("Error verifying document:", error);
      return "Failed to verify document";
    }
  }

  // toggle bookmarked

  @Mutation(() => Document, { nullable: true })
  async toggleBookmark(
    @Arg("documentId") documentId: number,
    @Ctx() {}: MyContext
  ): Promise<Document | null> {
    try {
      // Find the document by ID
      const document = await prisma.document.findUnique({
        where: {
          id: documentId,
        },
      });

      if (!document) {
        console.error("Document not found");
        return null;
      }

      // Toggle the bookmarked field
      const updatedDocument = await prisma.document.update({
        where: {
          id: documentId,
        },
        data: {
          bookmarked: !document.bookmarked, // Toggle the value
        },
      });

      return updatedDocument;
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      return null;
    }
  }
  
}
