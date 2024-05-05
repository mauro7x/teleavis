import React from 'react';
import { Container } from '@chakra-ui/react';

export default function SectionContainer({ children, ...props }) {
  return (
    <Container maxW={'6xl'} {...props}>
      {children}
    </Container>
  );
}
