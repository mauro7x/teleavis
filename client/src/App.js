import React from 'react';
import ClientProvider from './providers/ClientProvider';
import UserProvider from './providers/UserProvider';
import Router from './routes';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { THEME_ID } from '@mui/material';
import { createTheme } from '@mui/material/styles';

function App() {
  const theme = extendTheme();
  const muiTheme = createTheme();

  return (
    <ChakraProvider theme={{ ...theme, [THEME_ID]: muiTheme }}>
      <ClientProvider>
        <UserProvider>
          <Router />
        </UserProvider>
      </ClientProvider>
    </ChakraProvider>
  );
}

export default App;
