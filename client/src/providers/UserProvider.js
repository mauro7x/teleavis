import React, { useState, createContext, useContext, useEffect } from 'react';
import { isEmpty } from '../utils';
import LoadingPage from '../routes/LoadingPage';
import { Center } from '@chakra-ui/react';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a scoped async function in the hook
    async function runAsync() {
      try {
        const response = await fetch('/user');
        const userResponse = await response.text();
        if (userResponse !== '' && !isEmpty(userResponse)) {
          const { userinfo } = JSON.parse(userResponse);
          setUser({
            name: userinfo.name,
            username: userinfo.preferred_username,
            first_name: userinfo.given_name,
            last_name: userinfo.family_name,
            email: userinfo.email,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error', error);
        setLoading(null);
      }
    }

    runAsync();
  }, []);

  if (loading === true) {
    return <LoadingPage />;
  }
  if (loading === null) {
    return (
      <Center bg="tomato" h="100vh" color="white">
        The API is not working, cannot get the user !
      </Center>
    );
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
