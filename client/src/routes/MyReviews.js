import React from 'react';
import {
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function MyReviews() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const descriptionTextColor = useColorModeValue('gray.500', 'gray.300');

  return (
    <Container maxW={'full'} bg={bgColor} minHeight={'100vh'}>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 8, md: 10 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Coming{' '}
            <Text as={'span'} color={'red.400'}>
              soon
            </Text>
            ...
          </Heading>
          <Text color={descriptionTextColor} maxW={'3xl'}>
            ...or not 🤷
          </Text>
        </Stack>
      </Container>
    </Container>
  );
}
