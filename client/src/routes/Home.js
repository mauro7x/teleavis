import React, { useCallback, useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Container,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FiMessageSquare as MsgIco } from 'react-icons/fi';
import { useQuery } from '@apollo/client';
import { GET_SUBJECTS } from '../api/queries';
import ThemedSpinner from '../components/ThemedSpinner';
import SelectTrack from '../components/SelectTrack';
import {
  DifficultyRating,
  Rating,
  RatingInfo,
  WorkRating,
} from '../components/ratings';
import { computeRating, isEmpty, parseDate } from '../utils';
import { useUser } from '../providers/UserProvider';

const Reviews = ({ data }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.500', 'gray.300');

  const reviews = data.filter(
    (review) => review.comment && review.comment.trim() !== '',
  );

  if (!reviews.length) {
    return <Text>No comments yet</Text>;
  }

  return (
    <List spacing={{ base: 3, md: 3 }}>
      {reviews.map((review, index) => {
        const createdOn = new Date(review.createdOn);
        const date = parseDate(createdOn);

        return (
          <ListItem
            key={index}
            rounded={'md'}
            width={'full'}
            bg={bgColor}
            display="flex"
            flexDir={'column'}
            alignItems="center"
            p={3}
          >
            <Text color={textColor} as="i" marginBottom={2}>
              "{review.comment}"
            </Text>
            <Text color={textColor} fontSize={'2xs'}>
              ({date})
            </Text>
          </ListItem>
        );
      })}
    </List>
  );
};

const SubjectItemDetails = ({
  subject: {
    nReviews,
    cumRating,
    nAmountOfWorkRatings,
    cumAmountOfWorkRating,
    nDifficultyRatings,
    cumDifficultyRating,
    nTeacherRatings,
    cumTeacherRating,
    reviews,
  },
}) => {
  return (
    <Stack spacing={{ base: 5, md: 5 }} width="full">
      <SimpleGrid
        columns={{ base: 1, md: 4 }}
        spacing={{ base: 5, md: 10 }}
        width="full"
      >
        <RatingInfo
          component={DifficultyRating}
          title={'Difficulty'}
          nRatings={nDifficultyRatings}
          cumRating={cumDifficultyRating}
        />
        <RatingInfo
          component={WorkRating}
          title={'Amount of work'}
          nRatings={nAmountOfWorkRatings}
          cumRating={cumAmountOfWorkRating}
        />
        <RatingInfo
          component={Rating}
          title={'Teacher(s) rating'}
          nRatings={nTeacherRatings}
          cumRating={cumTeacherRating}
        />
        <RatingInfo
          component={Rating}
          title={'Overall subject rating'}
          nRatings={nReviews}
          cumRating={cumRating}
          fontWeight={700}
        />
      </SimpleGrid>
      <Reviews data={reviews} />
    </Stack>
  );
};

const TextReviewNumber = ({ number }) => {
  return (
    <Badge colorScheme="transparent" position="relative" display="inline-block">
      <Icon as={MsgIco} boxSize={6} />
      {number > 0 && (
        <Badge
          colorScheme="red"
          position="absolute"
          top="-1"
          right="-1"
          borderRadius="50%"
        >
          {number}
        </Badge>
      )}
    </Badge>
  );
};

const SubjectItem = ({ subject, ...props }) => {
  const { nReviews, cumRating, reviews } = subject;
  const rating = computeRating(nReviews, cumRating);
  const nbTextReviews = reviews.filter((oneReview) => oneReview.comment).length;

  return (
    <AccordionItem {...props}>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton
              py={4}
              display={'flex'}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Box
                as="span"
                flex="1"
                textAlign={{ base: 'center', md: 'left' }}
                marginBottom={{ base: 2, md: 0 }}
              >
                <Badge fontSize={'md'} marginRight={2}>
                  {subject.id}
                </Badge>
                {subject.name}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                textAlign={{ base: 'center', md: 'right' }}
              >
                {!isExpanded && rating !== null && (
                  <Text fontSize={'sm'} marginRight={2}>
                    {rating.toFixed(1)}
                  </Text>
                )}
                {!isExpanded && (
                  <Rating
                    value={rating}
                    disabled={rating === null}
                    precision={0.5}
                    readOnly
                  />
                )}
                {!isExpanded && (
                  <Text marginLeft={2} fontSize={'sm'}>
                    ({nReviews})
                  </Text>
                )}
                {!isExpanded && (
                  <TextReviewNumber number={nbTextReviews} />
                )}
                <AccordionIcon marginLeft={5} />
              </Box>
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4}>
            <SubjectItemDetails subject={subject} />
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

const SubjectsList = ({ trackId }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const boxBgColor = useColorModeValue('white', 'gray.800');
  const { loading, error, data } = useQuery(GET_SUBJECTS, {
    variables: { trackId },
  });

  if (loading) return <ThemedSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  const subjects = data.subjects;

  return (
    <Accordion
      w={'full'}
      bg={boxBgColor}
      rounded={'xl'}
      boxShadow={'xl'}
      color={textColor}
      allowMultiple
    >
      {subjects.map((subject, index) => (
        <SubjectItem
          key={subject.id}
          subject={subject}
          borderTop={index === 0 ? 'none' : '-moz-initial'}
          borderBottom={index === subjects.length - 1 ? 'none' : '-moz-initial'}
        />
      ))}
    </Accordion>
  );
};

export default function Home() {
  const descriptionTextColor = useColorModeValue('gray.500', 'gray.300');
  const strongTextColor = useColorModeValue('gray.700', 'gray.100');
  const user = useUser();
  const isLoggedIn = !isEmpty(user);
  const [selectedTrackId, setSelectedTrackId] = useState('');
  const onSelectTrackId = useCallback(
    (e) => setSelectedTrackId(e.target.value),
    [setSelectedTrackId],
  );

  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 4, md: 6 }}
        py={{ base: 8, md: 10 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          Welcome to{' '}
          <Text as={'span'} color={'red.400'}>
            Téléavis
          </Text>
        </Heading>
        <Text color={descriptionTextColor} maxW={'3xl'}>
          On this site you will find opinions and reviews from students about
          the different subjects in the second year of Télécom Paris. To get
          started, please select a study track below.{' '}
        </Text>
        {!isLoggedIn && (
          <Text color={descriptionTextColor} maxW={'3xl'} as="i">
            Note: to write your opinion on a subject, you must{' '}
            <Text
              as={'a'}
              display={'inline'}
              fontWeight={'bold'}
              href="/login"
              _hover={{
                color: strongTextColor,
                textDecorationLine: 'underline',
              }}
            >
              log in
            </Text>
            !
          </Text>
        )}
        <Stack
          w={'full'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          spacing={{ base: 4, md: 4 }}
        >
          <SelectTrack onChange={onSelectTrackId} />
          {selectedTrackId && <SubjectsList trackId={selectedTrackId} />}
        </Stack>
      </Stack>
    </Container>
  );
}
