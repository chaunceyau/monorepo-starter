import { ApolloClient, InMemoryCache } from "@apollo/client";
import { env } from './config';

export const client = new ApolloClient({
    uri: env.BACKEND_URL,
    cache: new InMemoryCache(),
});