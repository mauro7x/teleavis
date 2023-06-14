import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ClientProvider from './api/ClientProvider';
import UserProvider from './api/UserProvider';
import { router } from './routes';

function App() {
  return (
    <ChakraProvider>
      <ClientProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ClientProvider>
    </ChakraProvider>
  );
}

export default App;
