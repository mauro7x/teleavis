import { Box, Text, useColorModeValue } from '@chakra-ui/react';

export const RatingBox = ({
  component: RatingComponent,
  title,
  isRequired = false,
  ...props
}) => {
  const TitleText = isRequired ? (
    <Text fontSize={'sm'}>
      {title}{' '}
      <Text as="span" color="red">
        *
      </Text>
    </Text>
  ) : (
    <Text fontSize={'sm'}>{title}</Text>
  );

  return (
    <Box
      rounded={'xl'}
      bg={useColorModeValue('white', 'gray.800')}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      color={useColorModeValue('gray.600', 'gray.200')}
      justifyItems={'center'}
      px={4}
      py={2}
    >
      {TitleText}
      <RatingComponent {...props} />
    </Box>
  );
};
