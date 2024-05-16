import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { DocumentCreateManyInput } from "../../../inputs/DocumentCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyDocumentArgs {
    @TypeGraphQL.Field(_type => [DocumentCreateManyInput], {
            nullable: false
        })
    data!: DocumentCreateManyInput[];

    @TypeGraphQL.Field(_type => Boolean, {
            nullable: true
        })
    skipDuplicates?: boolean | undefined;
}
