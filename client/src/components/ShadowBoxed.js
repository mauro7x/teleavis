import { Box, useColorModeValue } from '@chakra-ui/react';

export default function ShadowBoxed({ children }) {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      rounded={'xl'}
      boxShadow={'xl'}
      color={useColorModeValue('gray.600', 'gray.200')}
      justifyItems={'center'}
      px={4}
      py={2}
    >
      {children}
    </Box>
  );
}
