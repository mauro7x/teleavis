import { useQuery } from '@apollo/client';
import * as React from 'react';
import { GET_PRIVATE } from './api/queries';

function Home() {
  const { loading, data, error } = useQuery(GET_PRIVATE);

  return (
    <div>
      <h1>Home page</h1>
      {loading ? (
        <p>Loading query...</p>
      ) : (
        <p>Query loaded. Results: {JSON.stringify({ data, error })}</p>
      )}
    </div>
  );
}

export default Home;
