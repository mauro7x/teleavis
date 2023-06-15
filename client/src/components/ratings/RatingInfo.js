import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { computeRating } from '../../utils';

export const RatingInfo = ({
  component: RatingComponent,
  title,
  nRatings,
  cumRating,
  fontWeight,
  ...props
}) => {
  const rating = computeRating(nRatings, cumRating);

  return (
    <Box
      rounded={'xl'}
      color={useColorModeValue('gray.600', 'gray.200')}
      justifyItems={'center'}
      px={4}
      py={2}
    >
      <Text fontSize={'xs'} fontWeight={fontWeight || 500}>
        {title}
      </Text>
      <Stack
        w={'full'}
        spacing={{ base: 2, md: 2 }}
        align="center"
        direction="row"
        justify="center"
      >
        {rating !== null && <Text fontSize={'sm'}>{rating.toFixed(1)}</Text>}
        <RatingComponent
          value={rating}
          disabled={rating === null}
          precision={0.5}
          size={'small'}
          readOnly
        />
        <Text fontSize={'sm'}>({nRatings})</Text>
      </Stack>
    </Box>
  );
};
