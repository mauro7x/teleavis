import React from 'react';
import { Select, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_SUBJECT_NAMES } from '../api/queries';
import ThemedSpinner from './ThemedSpinner';

export default function SelectSubject({ trackId, ...props }) {
  const { loading, error, data } = useQuery(GET_SUBJECT_NAMES, {
    variables: { trackId },
  });
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');

  if (loading) return <ThemedSpinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Select
      placeholder="Select a subject"
      color={textColor}
      bg={bgColor}
      {...props}
    >
      {data.subjects.map((subject) => (
        <option key={subject.id} value={subject.id}>
          {subject.id} - {subject.name}
        </option>
      ))}
    </Select>
  );
}
