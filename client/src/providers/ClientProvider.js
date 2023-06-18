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

const wsLink = new GraphQLWsLink(
  createClient({
    // This is not tested, so if it subscriptions don't work
    // it's probably because of this
    uri: `/api`,

    // config file has been removed so if needed, create again
    // url: `${secureProtocols ? 'wss' : 'ws'}://${host}/api`,
  }),
);

const httpLink = createHttpLink({
  uri: `/api`,
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
