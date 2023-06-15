import React, { useCallback, useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Select,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_SUBJECTS, GET_TRACKS } from '../api/queries';

const SelectTrack = ({ tracks, onChange }) => {
  return (
    <Select placeholder="Select a study track" onChange={onChange}>
      {tracks.map((track) => (
        <option key={track.id} value={track.id}>
          {track.id} - {track.name}
        </option>
      ))}
    </Select>
  );
};

const SubjectItem = ({ subject: { id, name, reviews } }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton _expanded={{ bg: 'gray.100' }}>
          <Box as="span" flex="1" textAlign="left">
            <Text fontWeight={700}>{id}</Text>{' '}
            <Text fontWeight={500}>{name}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>

      <AccordionPanel backgroundColor={'gray.200'} pb={4}>
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
    </AccordionItem>
  );
};

const SubjectsList = ({ trackId }) => {
  const { loading, error, data } = useQuery(GET_SUBJECTS, {
    variables: { trackId },
  });

  if (loading) return <Spinner />;

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Accordion allowMultiple>
      {data.subjects.map((subject) => (
        <SubjectItem key={subject.id} subject={subject} />
      ))}
    </Accordion>
  );
};

export default function Home() {
  const { error, loading, data } = useQuery(GET_TRACKS);
  const [selectedTrackId, setSelectedTrackId] = useState('');

  const handleSelectChange = useCallback(
    (event) => {
      setSelectedTrackId(event.target.value);
    },
    [setSelectedTrackId],
  );

  // if (error) return <ErrorPage error={error} />;

  return (
    <Flex justifyItems={'center'}>
      <VStack>
        {loading ? (
          <Spinner />
        ) : (
          <SelectTrack tracks={data.tracks} onChange={handleSelectChange} />
        )}

        {selectedTrackId && <SubjectsList trackId={selectedTrackId} />}
      </VStack>
    </Flex>
  );
}
