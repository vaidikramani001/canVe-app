import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://c7ff-2409-40c1-5a-3f84-3918-ab1f-eb20-f058.ngrok-free.app/graphql',
  cache: new InMemoryCache(),
});

export default client;