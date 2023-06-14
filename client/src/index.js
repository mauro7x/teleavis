import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import ClientProvider from './api/ClientProvider';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ClientProvider>
        <App />
      </ClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
