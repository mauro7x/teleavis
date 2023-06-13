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
import { useToken } from '../redux/selectors';
import { getMainDefinition } from '@apollo/client/utilities';
import config from '../config';

const { host, route, secureProtocols } = config.api;
const baseUrl = `${host}:3001/${route}`;
const wsProtocol = secureProtocols ? 'wss' : 'ws';
const httpProtocol = secureProtocols ? 'https' : 'http';

console.debug({ secureProtocols, wsProtocol, httpProtocol });

const wsLink = new GraphQLWsLink(
  createClient({
    url: wsProtocol + '://' + baseUrl,
  }),
);

const httpLink = createHttpLink({
  uri: httpProtocol + '://' + baseUrl,
});

const ClientProvider = ({ children }) => {
  const token = useToken();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
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
