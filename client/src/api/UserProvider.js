import React, { useState, createContext, useContext, useEffect } from 'react';
import { isEmpty } from '../utils';
import { login } from './session';
import LoadingPage from '../pages/LoadingPage';

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

        if (userResponse === '' || isEmpty(userResponse)) {
          login(); // (!) Redirects
        } else {
          setUser(JSON.parse(userResponse));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error', error);
      }
    }

    runAsync();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
