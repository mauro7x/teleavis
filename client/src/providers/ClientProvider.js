import * as React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import config from '../config';

const { host, route, secureProtocols } = config.api;
const baseUrl = `${host}/${route}`;
const wsProtocol = secureProtocols ? 'wss' : 'ws';
const httpProtocol = secureProtocols ? 'https' : 'http';

const wsLink = new GraphQLWsLink(
  createClient({
    url: wsProtocol + '://' + baseUrl,
  }),
);

const httpLink = createHttpLink({
  uri: httpProtocol + '://' + baseUrl,
});

const ClientProvider = ({ children }) => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
      },
    };
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink),
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientProvider;
