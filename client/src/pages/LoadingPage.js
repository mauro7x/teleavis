import React from 'react';
import { Spinner, Flex, useColorModeValue } from '@chakra-ui/react';

export default function LoadingPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Flex
      bg={bgColor}
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="xl" color="red.400" />
    </Flex>
  );
}
