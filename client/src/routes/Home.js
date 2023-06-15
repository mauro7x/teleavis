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
  Select,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { useQuery } from '@apollo/client';
import { GET_SUBJECTS, GET_TRACKS } from '../api/queries';
import { Rating } from '@mui/material';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const ThemedSpinner = (props) => <Spinner color="red.400" {...props} />;

const SelectTrack = ({ tracks, onChange, ...props }) => {
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Select
      placeholder="Select a study track"
      onChange={onChange}
      color={textColor}
      bg={bgColor}
      {...props}
    >
      {tracks.map((track) => (
        <option key={track.id} value={track.id}>
          {track.id} - {track.name}
        </option>
      ))}
    </Select>
  );
};

const SubjectItem = ({
  subject: { id, name, reviews, nbReviews, cumRating },
  ...props
}) => {
  const rating = nbReviews > 0 ? (cumRating / nbReviews).toFixed(1) : null;
  const ratingBorderColor = useColorModeValue('default', '#999999');

  return (
    <AccordionItem {...props}>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Badge fontSize={'md'} marginRight={2}>
                  {id}
                </Badge>
                {name}
              </Box>
              <Box textAlign="right" display="flex" alignItems="center">
                {rating !== null && (
                  <Text fontSize={'sm'} marginRight={2}>
                    {rating}
                  </Text>
                )}
                <Rating
                  value={rating ?? 0}
                  disabled={rating === null}
                  precision={0.5}
                  emptyIcon={
                    <StarBorderIcon
                      fontSize="inherit"
                      style={{ color: ratingBorderColor }}
                    />
                  }
                  readOnly
                />
                <Text marginLeft={2} fontSize={'sm'}>
                  ({nbReviews})
                </Text>
                <AccordionIcon marginLeft={5} />
              </Box>
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4}>
            {reviews.length ? (
              <ul>
                {reviews
                  .filter(
                    (review) => review.comment && review.comment.trim() !== '',
                  )
                  .map((review, index) => (
                    <li key={index}>
                      {review.comment} ({review.rating}/5)
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No reviews yet</p>
            )}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

const SubjectsList = ({ trackId }) => {
  const { loading, error, data } = useQuery(GET_SUBJECTS, {
    variables: { trackId },
  });

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const boxBgColor = useColorModeValue('white', 'gray.800');

  if (loading) return <ThemedSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Accordion
      w={'full'}
      bg={boxBgColor}
      rounded={'xl'}
      boxShadow={'xl'}
      color={textColor}
      allowMultiple
    >
      {data.subjects.map((subject, index) => (
        <SubjectItem
          key={subject.id}
          subject={subject}
          borderTop={index === 0 ? 'none' : '-moz-initial'}
        />
      ))}
    </Accordion>
  );
};

export default function Home() {
  const { error, loading, data } = useQuery(GET_TRACKS);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const descriptionTextColor = useColorModeValue('gray.500', 'gray.300');

  const [selectedTrackId, setSelectedTrackId] = useState('');

  const handleSelectChange = useCallback(
    (event) => {
      setSelectedTrackId(event.target.value);
    },
    [setSelectedTrackId],
  );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container maxW={'full'} bg={bgColor} minHeight={'100vh'}>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
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
            started, please select a study track below.
          </Text>

          <Stack
            w={'full'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            spacing={{ base: 4, md: 4 }}
          >
            {loading && <ThemedSpinner />}
            {!loading && (
              <SelectTrack
                tracks={data?.tracks}
                onChange={handleSelectChange}
              />
            )}
            {selectedTrackId && <SubjectsList trackId={selectedTrackId} />}
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
}
