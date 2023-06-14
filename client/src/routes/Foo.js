import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PUBLIC } from '../api/queries';

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
    </div>
  );
}

export default Foo;
