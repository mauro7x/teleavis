import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRIVATE } from '../api/queries';
import { Link } from 'react-router-dom';

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
      <Link to={`foo`}>Go to see some public data!</Link>
    </div>
  );
}

export default Home;
