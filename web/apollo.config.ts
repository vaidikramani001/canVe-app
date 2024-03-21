import { NEXT_PUBLIC_GRAPHQL_API } from "./src/lib/constants";
import { ApolloClientOptions, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client'
const httpLink = createUploadLink({
    uri: NEXT_PUBLIC_GRAPHQL_API,
    credentials: 'include',
})
export default {    
    link: httpLink,
    cache: new InMemoryCache(),
    credentials: 'include',
} as ApolloClientOptions<unknown>