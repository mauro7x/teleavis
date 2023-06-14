import React from 'react';

import { Link } from 'react-router-dom';
import { useUser } from '../api/UserProvider';

function Home() {
  // const { loading, data, error } = useQuery(GET_PRIVATE);
  const user = useUser();

  return (
    <div>
      <h1>Home page</h1>
      <h2>You are logged in as {user.name}</h2>
      <Link to={`/create-review`}>Click here to create a review!</Link>
      {/* {loading ? (
        <p>Loading query...</p>
      ) : (
        <p>Query loaded. Results: {JSON.stringify({ data, error })}</p>
      )} */}
    </div>
  );
}

export default Home;
