import React, { createContext, useContext } from 'react';
import { useColorModeValue } from '@chakra-ui/react';

const ColorsContext = createContext();

export function useColors() {
  return useContext(ColorsContext);
}

export default function ColorsProvider({ children }) {
  const colors = {
    icons: {
      difficulty: useColorModeValue('#c73636', '#f04f4f'),
      work: useColorModeValue('#2b5399', '#3c6aba'),
      star: '#faaf00',
      ratingBorderColor: useColorModeValue('default', '#999999'),
    },
  };

  return (
    <ColorsContext.Provider value={colors}>{children}</ColorsContext.Provider>
  );
}
