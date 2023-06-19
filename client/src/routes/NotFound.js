import React from 'react';
import {
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function NotFound() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const descriptionTextColor = useColorModeValue('gray.500', 'gray.300');
  const strongTextColor = useColorModeValue('gray.700', 'gray.100');

  return (
    <Flex
      bg={bgColor}
      height="80vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 4, md: 6 }}
        py={{ base: 8, md: 10 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Oops...{' '}
          <Text as={'span'} color={'red.400'}>
            nothing here :(
          </Text>
        </Heading>
        <Text
          color={descriptionTextColor}
          maxW={'3xl'}
          href={'/'}
          as={'a'}
          _hover={{
            color: strongTextColor,
            textDecorationLine: 'underline',
          }}
        >
          Go back home!
        </Text>
      </Stack>
    </Flex>
  );
}
