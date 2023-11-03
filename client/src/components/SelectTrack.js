import React from 'react';
import { Select, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_TRACKS } from '../api/queries';
import ThemedSpinner from './ThemedSpinner';
import ErrorMsg from './ErrorMsg';

export default function SelectTrack(props) {
  const { error, loading, data } = useQuery(GET_TRACKS);
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');

  if (loading) return <ThemedSpinner />;
  if (error) return <ErrorMsg error={error} />;

  return (
    <Select
      placeholder="Select a study track"
      color={textColor}
      bg={bgColor}
      {...props}
    >
      {data.tracks.map((track) => (
        <option key={track.id} value={track.id}>
          {track.id} - {track.name}
        </option>
      ))}
    </Select>
  );
}
