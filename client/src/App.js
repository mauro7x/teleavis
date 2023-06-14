import { useQuery } from '@apollo/client';
import { Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { GET_PRIVATE, GET_PUBLIC } from './api/queries';

const App = () => {
  // Data
  const userData = {};

  // Setting state
  const [user, setUser] = useState(userData);

  const {
    loading: publicLoading,
    data: publicData,
    error: publicError,
  } = useQuery(GET_PUBLIC);
  const {
    loading: privateLoading,
    data: privateData,
    error: privateError,
  } = useQuery(GET_PRIVATE);

  useEffect(() => {
    // Create a scoped async function in the hook
    async function runAsync() {
      try {
        const response = await fetch('/user');
        const userResponse = await response.text();
        setUser(JSON.parse(userResponse));
        if (userResponse !== '') {
          console.log('userResponse', userResponse);
        }
      } catch (error) {
        console.error('Error', error);
      }
    }
    // Execute the created function directly
    runAsync();
    // https://stackoverflow.com/a/55854902/1098564
    // eslint-disable-next-line
  }, []);

  const login = () => {
    window.location.replace('/login');
  };
  const logout = () => {
    window.location.replace('/logout');
  };

  // https://stackoverflow.com/a/32108184/1098564
  const isEmpty = (obj: Object) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  return (
    <div>
      {!isEmpty(user) ? (
        <h1>You're logged in!</h1>
      ) : (
        <h1>You're not logged in.</h1>
      )}

      {user && user.userinfo && (
        <p className="lead">Hey {user.userinfo.name}</p>
      )}

      <p className="lead">
        {isEmpty(user) ? (
          <Button color="primary" onClick={login}>
            Login
          </Button>
        ) : (
          <Button color="danger" onClick={logout}>
            Logout
          </Button>
        )}
      </p>

      <p>
        Public:{' '}
        {JSON.stringify({
          data: publicData,
          error: publicError,
          loading: publicLoading,
        })}
      </p>
      <br />
      <p>
        Private:{' '}
        {JSON.stringify({
          data: privateData,
          error: privateError,
          loading: privateLoading,
        })}
      </p>
    </div>
  );
};

export default App;
