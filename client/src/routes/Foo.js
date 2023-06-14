import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PUBLIC } from '../api/queries';
import { Link } from 'react-router-dom';

function Foo() {
  const { loading, data, error } = useQuery(GET_PUBLIC);

  return (
    <div>
      <h1>Public data page</h1>
      {loading ? (
        <p>Loading query...</p>
      ) : (
        <p>Query loaded. Results: {JSON.stringify({ data, error })}</p>
      )}
      <Link to={`/`}>Go back home</Link>
    </div>
  );
}

export default Foo;
