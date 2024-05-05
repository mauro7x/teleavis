import React from 'react';
import { Heading } from '@chakra-ui/react';

export default function SectionHeading({ children, ...props }) {
  return (
    <Heading
      fontWeight={600}
      fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
      lineHeight={'110%'}
      {...props}
    >
      {children}
    </Heading>
  );
}
