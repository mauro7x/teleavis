import React from 'react';
import {
  Badge,
  Button,
  HStack,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_MY_REVIEWS } from '../api/queries';
import ThemedSpinner from '../components/ThemedSpinner';
import SectionHeading from '../components/SectionHeading';
import SectionContainer from '../components/SectionContainer';
import { parseDate } from '../utils';
import { DifficultyRating, Rating, WorkRating } from '../components/ratings';
import { Star } from '@mui/icons-material';
import { useColors } from '../providers/ColorsProvider';

const RatingInfo = ({ component: RatingComponent, value }) => {
  return (
    <Stack
      w={'full'}
      spacing={{ base: 2, md: 2 }}
      align="center"
      direction="row"
      justify="center"
    >
      <Text fontSize={'sm'}>{value ? value.toFixed(1) : '-'}</Text>
      <RatingComponent
        value={value}
        disabled={value === null}
        precision={1}
        size={'small'}
        readOnly
      />
    </Stack>
  );
};

const RatingsTable = ({
  difficultyRating,
  amountOfWorkRating,
  teacherRating,
  rating,
}) => {
  return (
    <TableContainer>
      <Table variant="unstyled" size="sm">
        <Tbody>
          <Tr>
            <Td>Difficulty</Td>
            <Td>
              <RatingInfo
                component={DifficultyRating}
                value={difficultyRating}
              />
            </Td>
          </Tr>
          <Tr>
            <Td>Amount of work</Td>
            <Td>
              <RatingInfo component={WorkRating} value={amountOfWorkRating} />
            </Td>
          </Tr>
          <Tr>
            <Td>Teacher's rating</Td>
            <Td>
              <RatingInfo component={Rating} value={teacherRating} />
            </Td>
          </Tr>
          <Tr>
            <Td>Overall rating</Td>
            <Td>
              <RatingInfo component={Rating} value={rating} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const RatingsPopover = ({ subjectId, ratings, marginLeft }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button marginLeft={marginLeft} size="sm" aria-label="View ratings">
          View
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Rating details for {subjectId}</PopoverHeader>
        <PopoverBody>
          <RatingsTable {...ratings} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const CommentPopover = ({ comment }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" aria-label="View comment">
          View
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <Text>{comment}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const ReviewItem = ({
  review: {
    subject,
    comment,
    createdOn,
    modifiedOn,
    difficultyRating,
    amountOfWorkRating,
    teacherRating,
    rating,
  },
  ...props
}) => {
  const lastModified = new Date(modifiedOn ?? createdOn);
  const lastModifiedShort = parseDate(lastModified);
  const {
    icons: { star },
  } = useColors();

  return (
    <Tr key={subject.id}>
      <Td>
        <Badge fontSize={'sm'}>{subject.id}</Badge>
      </Td>
      <Td>{subject.name}</Td>
      <Td>
        <HStack>
          <Text fontSize="sm">{rating.toFixed(1)}</Text>
          <Icon as={Star} color={star} />

          <RatingsPopover
            subjectId={subject.id}
            ratings={{
              difficultyRating,
              amountOfWorkRating,
              teacherRating,
              rating,
            }}
            marginLeft={2}
          />
        </HStack>
      </Td>
      <Td>{comment ? <CommentPopover comment={comment} /> : <Text>-</Text>}</Td>
      <Td>
        <Tooltip label={lastModified.toUTCString()}>
          {lastModifiedShort}
        </Tooltip>
      </Td>
    </Tr>
  );
};

const ReviewsTable = ({ reviews }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const boxBgColor = useColorModeValue('white', 'gray.800');

  return (
    <TableContainer
      w={'full'}
      bg={boxBgColor}
      rounded={'xl'}
      boxShadow={'xl'}
      color={textColor}
      whiteSpace={'normal'}
      overflowY={'auto'}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Name</Th>
            <Th>Ratings</Th>
            <Th>Comment</Th>
            <Th>Last Modified</Th>
          </Tr>
        </Thead>
        <Tbody>{reviews.map((review) => ReviewItem({ review }))}</Tbody>
      </Table>

      {!reviews.length && (
        <Text margin={4}>
          You have not written any review yet...{' '}
          <Text
            color={'red.400'}
            as={'a'}
            display={'inline'}
            fontWeight={'bold'}
            href="/create-review"
            _hover={{
              textDecorationLine: 'underline',
            }}
          >
            Write one now!
          </Text>
        </Text>
      )}
    </TableContainer>
  );
};

export default function MyReviews() {
  const descriptionTextColor = useColorModeValue('gray.500', 'gray.300');

  const { loading, error, data } = useQuery(GET_MY_REVIEWS);

  if (loading) return <ThemedSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  const reviews = data.myReviews;

  return (
    <SectionContainer>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 8, md: 10 }}
      >
        <SectionHeading>
          My{' '}
          <Text as={'span'} color={'red.400'}>
            Reviews
          </Text>
        </SectionHeading>
        <Text color={descriptionTextColor} maxW={'3xl'}>
          In this section you can see the reviews you've added. In the future,
          you will also be able to modify them!
        </Text>
        <ReviewsTable reviews={reviews} />
      </Stack>
    </SectionContainer>
  );
}
