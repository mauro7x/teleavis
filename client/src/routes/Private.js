import React from 'react';
import { useUser } from '../providers/UserProvider';
import { isEmpty } from '../utils';
import NotFound from './NotFound';

export default function Private(Component) {
  const user = useUser();
  const isLoggedIn = !isEmpty(user);

  return isLoggedIn ? <Component /> : <NotFound />;
}
