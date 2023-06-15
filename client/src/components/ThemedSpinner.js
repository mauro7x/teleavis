import React from 'react';
import { Spinner } from '@chakra-ui/react';

export default function ThemedSpinner(props) {
  return <Spinner color="red.400" {...props} />;
}
