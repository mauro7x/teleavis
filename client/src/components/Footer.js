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
        Any comments, suggestions, or bug reports, please{' '}
        <Link color="red.400" href="create an issue">
          create an issue
        </Link>{' '}
        on our{' '}
        <Link color="red.400" href="https://github.com/mauro7x/teleavis">
          GitHub repository
        </Link>
        , or contact me (
        <Link color="red.400" href="mailto:mauro.parafati@telecom-paris.fr">
          Email
        </Link>
        ,{' '}
        <Link color="red.400" href="https://www.facebook.com/Mauro7x/">
          Facebook
        </Link>
        )
      </Text>
    </Box>
  );
}
