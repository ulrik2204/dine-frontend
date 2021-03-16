import { SetStateAction } from 'react';
import { createContext, Dispatch } from 'react';

/**
 * The authentication token for the user is put here. If no user is logged in, is is an empyt string
 */
type ContextType = {
  userToken: string;
  setUserToken: Dispatch<SetStateAction<string>>;
};
const UserContext = createContext<ContextType>({ userToken: '', setUserToken: () => {} });

export default UserContext;
