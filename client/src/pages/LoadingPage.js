import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import ThemedSpinner from '../components/ThemedSpinner';

export default function LoadingPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Flex
      bg={bgColor}
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <ThemedSpinner size="xl" />
    </Flex>
  );
}
