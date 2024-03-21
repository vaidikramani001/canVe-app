import { ApolloClient, InMemoryCache } from '@apollo/client';
import {NEXT_PUBLIC_GRAPHQL_API} from './lib/constants';
export const client = new ApolloClient({
  uri: NEXT_PUBLIC_GRAPHQL_API,
  cache: new InMemoryCache()
});
