import { Box, Link, Text, useColorModeValue } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.500', 'gray.300')}
      maxW={'full'}
      justify={'center'}
      align={'center'}
      borderTop={'1px solid'}
      p={7}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Text>
        Any comments, suggestions, or bug reports, please send an email to{' '}
        <Link color="red.400" href="mauro.parafati@telecom-paris.fr">
          mauro.parafati@telecom-paris.fr
        </Link>{' '}
        or contact me on{' '}
        <Link color="red.400" href="https://www.facebook.com/Mauro7x/">
          Facebook
        </Link>
      </Text>
    </Box>
  );
}
