import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../api/mutations';
import {
  Button,
  Container,
  FormControl,
  HStack,
  Heading,
  Highlight,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import SelectTrack from '../components/SelectTrack';
import SelectSubject from '../components/SelectSubject';
import DisabledSelect from '../components/DisabledSelect';
import CustomAlert from '../components/CustomAlert';
import {
  DifficultyRating,
  Rating,
  RatingBox,
  WorkRating,
} from '../components/ratings';

export default function CreateReview() {
  const [createReview] = useMutation(CREATE_REVIEW);
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');

  const descriptionTextColor = useColorModeValue('gray.500', 'gray.300');

  const [error, setError] = useState('');
  const {
    isOpen: isAlertVisible,
    onClose: onCloseAlert,
    onOpen: onOpenAlert,
  } = useDisclosure({ defaultIsOpen: false });

  const [selectedTrackId, setSelectedTrackId] = useState('');
  const onSelectTrackId = useCallback(
    (e) => setSelectedTrackId(e.target.value),
    [],
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const onSelectSubjectId = useCallback(
    (e) => setSelectedSubjectId(e.target.value),
    [],
  );
  const [comment, setComment] = useState('');
  const onChangeComment = useCallback((e) => setComment(e.target.value), []);

  const [difficultyRating, setDifficultyRating] = useState(null);
  const onChangeDifficultyRating = useCallback(
    (_, newValue) => {
      setDifficultyRating(newValue === difficultyRating ? null : newValue);
    },
    [difficultyRating],
  );

  const [amountOfWorkRating, setAmountOfWorkRating] = useState(null);
  const onChangeAmountOfWorkRating = useCallback(
    (_, newValue) => {
      setAmountOfWorkRating(newValue === amountOfWorkRating ? null : newValue);
    },
    [amountOfWorkRating],
  );

  const [teacherRating, setTeacherRating] = useState(null);
  const onChangeTeacherRating = useCallback(
    (_, newValue) => {
      setTeacherRating(newValue === teacherRating ? null : newValue);
    },
    [teacherRating],
  );

  const [rating, setRating] = useState(null);
  const onChangeRating = useCallback(
    (_, newValue) => {
      setRating(newValue === rating ? null : newValue);
    },
    [rating],
  );

  const onClear = useCallback(() => {
    setSelectedTrackId('');
    setSelectedSubjectId('');
    setDifficultyRating(null);
    setAmountOfWorkRating(null);
    setTeacherRating(null);
    setRating(null);
    setComment('');
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const createReviewInput = {
        subjectId: selectedSubjectId,
        rating: rating,
        ...(difficultyRating ? { difficultyRating } : {}),
        ...(amountOfWorkRating ? { amountOfWorkRating } : {}),
        ...(teacherRating ? { teacherRating } : {}),
        ...(comment ? { comment } : {}),
      };

      try {
        const { data } = await createReview({
          variables: { createReviewInput },
        });
        console.debug('Created:', data);
        onClear();
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
      onOpenAlert();
    },
    [
      onOpenAlert,
      onClear,
      createReview,
      amountOfWorkRating,
      comment,
      difficultyRating,
      rating,
      selectedSubjectId,
      teacherRating,
    ],
  );

  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 8, md: 10 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
          lineHeight={'110%'}
        >
          With great{' '}
          <Text as={'span'} color={'red.400'}>
            power
          </Text>
          ...
        </Heading>
        <Text color={descriptionTextColor} maxW={'2xl'}>
          <Highlight
            query="No excessive language will be allowed"
            styles={{
              px: '2',
              py: '1',
              rounded: 'full',
              bg: 'red.100',
              fontWeight: 'bold',
            }}
          >
            Please take the time to fill in the fields honestly and responsibly.
            No excessive language will be allowed in the review. Your response
            will help future students make better decisions!
          </Highlight>
        </Text>

        <Stack
          w={'full'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          spacing={{ base: 4, md: 4 }}
        >
          <FormControl isRequired>
            <SelectTrack value={selectedTrackId} onChange={onSelectTrackId} />
          </FormControl>

          <FormControl isRequired>
            {selectedTrackId ? (
              <SelectSubject
                trackId={selectedTrackId}
                value={selectedSubjectId}
                onChange={onSelectSubjectId}
              />
            ) : (
              <DisabledSelect placeholder={'Select a subject'}></DisabledSelect>
            )}
          </FormControl>

          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            spacing={{ base: 5, md: 10 }}
            width="full"
          >
            <RatingBox
              component={DifficultyRating}
              title={'Difficulty'}
              value={difficultyRating}
              onChange={onChangeDifficultyRating}
            />
            <RatingBox
              component={WorkRating}
              title={'Amount of work'}
              value={amountOfWorkRating}
              onChange={onChangeAmountOfWorkRating}
            />
            <RatingBox
              component={Rating}
              title={'Rate your teacher(s)'}
              value={teacherRating}
              onChange={onChangeTeacherRating}
            />
            <RatingBox
              component={Rating}
              title={'Overall subject rating'}
              value={rating}
              onChange={onChangeRating}
              isRequired
            />
          </SimpleGrid>

          <FormControl>
            <Textarea
              color={textColor}
              bg={bgColor}
              placeholder="Write a comment about this subject"
              resize={'none'}
              value={comment}
              onChange={onChangeComment}
            />
          </FormControl>

          {isAlertVisible &&
            (!error ? (
              <CustomAlert
                status={'success'}
                title={'Review saved successfully!'}
                description={
                  'Your review has been saved successfully, thank you for your contribution! In future versions you will be able to see and modify your reviews in the "My Reviews" section.'
                }
                onClose={onCloseAlert}
              />
            ) : (
              <CustomAlert
                status={'error'}
                title={'Error while saving your review :('}
                description={error}
                onClose={onCloseAlert}
              />
            ))}

          <HStack>
            <Button
              minW={20}
              colorScheme="gray"
              variant={'outline'}
              onClick={onClear}
              isDisabled={
                !(
                  selectedTrackId ||
                  selectedSubjectId ||
                  rating ||
                  difficultyRating ||
                  amountOfWorkRating ||
                  teacherRating ||
                  comment
                )
              }
            >
              Clear
            </Button>
            <Button
              minW={20}
              colorScheme="green"
              isDisabled={!(selectedTrackId && selectedSubjectId && rating)}
              onClick={onSubmit}
            >
              Save
            </Button>
          </HStack>
        </Stack>
      </Stack>
    </Container>
  );
}
