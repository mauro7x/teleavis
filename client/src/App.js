import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ClientProvider from './providers/ClientProvider';
import UserProvider from './providers/UserProvider';
import Router from './routes';

function App() {
  return (
    <ChakraProvider>
      <ClientProvider>
        <UserProvider>
          <Router />
        </UserProvider>
      </ClientProvider>
    </ChakraProvider>
  );
}

export default App;
