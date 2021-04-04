import { useContext } from 'react';
import UserContext from './UserContext';

export const isLoggedIn = (): boolean => {
  const { userToken } = useContext(UserContext);
  return userToken !== '';
};
