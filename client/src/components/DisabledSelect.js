import React from 'react';
import { Select, useColorModeValue } from '@chakra-ui/react';

export default function DisabledSelect(props) {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Select color={textColor} bg={bgColor} disabled={true} {...props}></Select>
  );
}
