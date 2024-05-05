import React from 'react';
import { Stack, Text, useColorModeValue } from '@chakra-ui/react';
import SectionHeading from '../components/SectionHeading';
import SectionContainer from '../components/SectionContainer';

export default function Tracks() {
  const descriptionTextColor = useColorModeValue('gray.500', 'gray.300');

  return (
    <SectionContainer>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 8, md: 10 }}
      >
        <SectionHeading>
          Coming{' '}
          <Text as={'span'} color={'red.400'}>
            soon
          </Text>
          ...
        </SectionHeading>
        <Text color={descriptionTextColor} maxW={'3xl'}>
          ...or not 🤷
        </Text>
      </Stack>
    </SectionContainer>
  );
}
