import React from 'react';
import ClientProvider from './providers/ClientProvider';
import UserProvider from './providers/UserProvider';
import Router from './routes';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { THEME_ID } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import ColorsProvider from './providers/ColorsProvider';

function App() {
  const theme = extendTheme();
  const muiTheme = createTheme();

  return (
    <ChakraProvider theme={{ ...theme, [THEME_ID]: muiTheme }}>
      <ColorsProvider>
        <ClientProvider>
          <UserProvider>
            <Router />
          </UserProvider>
        </ClientProvider>
      </ColorsProvider>
    </ChakraProvider>
  );
}

export default App;
