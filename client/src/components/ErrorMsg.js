import { Box, Center } from '@chakra-ui/react';

const ErrorMsg = ({ error }) => {
  const message = error?.message || 'An error occurred without message';
  return (
    <Center bg="tomato" color="white" p="4" borderRadius="10" fontWeight="bold">
      <details>
        <summary>Error: {message}</summary>
        <Box align="left">
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(error, null, 4)}
          </pre>
        </Box>
      </details>
    </Center>
  );
};

export default ErrorMsg;
