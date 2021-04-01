import { useCallback, useContext, useEffect, useState } from 'react';
import axios from '../myaxios';
import { defaultAllergy, defaultDinner, defaultUser } from '../util/constants';
import { Allergy, Dinner, LoginUser, RegistrationUser, User } from '../util/types';
import UserContext from '../util/UserContext';
import useDidMountEffect from './useDidMountEffect';

/**
 * A function to get the headers ot be send for a request.
 * @param userToken The token of the user logged in.
 * @returns A headers object.
 */
const getHeaders = (userToken: string) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: '',
  };
  if (['', 'null', null, undefined, 'undefined'].indexOf(userToken) === -1) {
    headers.Authorization = 'Token ' + userToken;
  }
  return headers;
};

/**
 * A hook for retrieving the data from the backend
 * @param urlPath - The path of the url to get from after https://localhost:8000
 * @param immediate If the reqeust should be send immediately, default true.
 * @returns The data fetched from the API
 */
const useGetFromAPI = (urlPath: string, immediate = true): any => {
  const [data, setData] = useState<any>();
  const { userToken } = useContext(UserContext);
  const headers = getHeaders(userToken);
  // The function to perform the GET request.
  useDidMountEffect(
    () => {
      axios
        .get(urlPath, { headers: headers })
        // After the response is recieved, take that data and put it in a state
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    },
    [setData, urlPath],
    immediate,
  );
  // Return that state
  return data;
};

/**
 * The hook to perform a POST request to the API
 * @param urlPath - The urlpath to send the post request to (path after localhost:8000)
 * @param obj - The object to post
 * @returns An object of the status of the request, and a method, resetStatus to set status to 0
 * @remarks
 * The request is not sent the first time, but when the onject or urlPath is changed.
 */
const usePostToAPI = (urlPath: string, obj: unknown): { status: number; resetStatus: () => void } => {
  const [status, setStatus] = useState<number>(0);
  const { userToken } = useContext(UserContext);
  const headers = getHeaders(userToken);

  // The post request is not performed at hook declaration, but after the value is changed
  useDidMountEffect(() => {
    axios
      .post(urlPath, JSON.stringify(obj), {
        headers: headers,
      })
      // After a response is recieved, retrieve its status code
      .then((res) => setStatus(res.status))
      .catch((err) => {
        console.log(err);
        setStatus(err.response.status);
      });
  }, [setStatus, urlPath, obj]);

  const resetStatus = useCallback(() => {
    setStatus(0);
  }, [setStatus]);

  return { status, resetStatus };
};

/**
 * Hook to get all Dinners from the API
 * @returns All dinners in the API as a list of Dinner objects
 */
export const useGetAllDinnersFromAPI = (): Dinner[] => {
  const dinnerListAPI = useGetFromAPI('/api/dinners/', true);
  // The DinnerList cannot be undefined, thus it returns a default dinner
  return dinnerListAPI || [defaultDinner];
};

/**
 * A hook to get a single Dinner from the API
 * @param id - The id of the dinner you want to fetch from the API
 * @param immediate If the reqeust should be send immediately, default true.
 * @returns The dinner with that id in the API
 */
export const useGetDinnerFromAPI = (id: number, immediate = true): Dinner => {
  const dinnerAPI = useGetFromAPI(`/api/dinners/${id}/`, immediate);
  // The DinnerList cannot be undefined, thus it returns a default dinner
  return dinnerAPI || defaultDinner;
};

/**
 * A post request to post a dinner to the API
 * @param dinner - The dinner object to POST to the API.
 * @returns An object of the status of the request, and a method, resetStatus to set status to 0
 * @remarks The request is not sent the first time, but when the dinner object is changed.
 */
export const usePostDinnerToAPI = (dinner: Dinner): { status: number; resetStatus: () => void } => {
  return usePostToAPI('/api/dinners/', dinner);
};

/**
 * Hook to sign the user that is logged in for a dinner.
 * @param dinnerID - The dinner to sign up for
 * @returns An object of the status of the request, and a method, resetStatus to set status to 0
 * @remarks The PUT request is not sent the first time, but when the dinnerID is changed.
 */
export const useSignupForDinner = (dinnerID: number): { status: number; resetStatus: () => void } => {
  const [status, setStatus] = useState<number>(0);
  const { userToken } = useContext(UserContext);
  const headers = getHeaders(userToken);

  // The post request is not performed at hook declaration, but after the value is changed
  useEffect(() => {
    axios
      .put(`/api/dinners/${dinnerID}/signup/`, JSON.stringify({}), {
        headers: headers,
      })
      // After a response is recieved, retrieve its status code
      .then((res) => setStatus(res.status))
      .catch((err) => {
        console.log(err);
        setStatus(err.response.status);
      });
  }, [setStatus, dinnerID]);

  const resetStatus = useCallback(() => {
    setStatus(0);
  }, [setStatus]);

  return { status, resetStatus };
};

/**
 * A GET request to fetch all the allergies registered in the API
 * @returns All the Allergies registered in the API as a list of Allergy objects
 */
export const useGetAllAllergiesFromAPI = (): Allergy[] => {
  const allergiesAPI = useGetFromAPI('/api/allergies/', true);
  return allergiesAPI || [defaultAllergy];
};

/**
 * A GET request to fetch one allergy by their ID
 * @param allergyID - The allergyID of the allergy to fetch
 * @param immediate If the reqeust should be send immediately, default true.
 * @returns The allergy object with the given ID
 */
export const useGetAllergyFromAPI = (allergyID: number, immediate = true): Allergy => {
  const allergyAPI = useGetFromAPI(`/api/allergies/${allergyID}/`, immediate);
  return allergyAPI || defaultAllergy;
};

/**
 * Hook t o get all users from API
 * @returns All users in the API (not including password)
 */
export const useGetAllUsersFromAPI = (): User[] => {
  const usersAPI = useGetFromAPI('/api/users/', true);
  return usersAPI || [defaultUser];
};
/**
 * Hook to get the data for a single user from the API by the token.
 * @param immediate If the reqeust should be send immediately, default true.
 * @returns A user object for the user logged in
 */
export const useGetUserByTokenFromAPI = (immediate = true): User => {
  const user = useGetFromAPI(`/api/users/getbytokenheader/`, immediate);
  return user?.user || defaultUser;
};

/**
 * Hook to get the user data by their id from the API
 * @param userID The ID of the user to get.
 * @param immediate If the reqeust should be send immediately, default true.
 * @returns The user with that id.
 */
export const useGetUserByIDFromAPI = (userID: number, immediate = true): User => {
  const user = useGetFromAPI(`/api/users/${userID}/`, immediate);
  return user || defaultUser;
};

/**
 * A hook register a user to the API
 * @param user - The user object to post
 * @returns An object of the status of the request, and a method, resetStatus to set status to 0
 * @remarks The request is not sent the first time, but when the registerUser is changed.
 */
export const useRegisterUser = (user: RegistrationUser): { status: number; resetStatus: () => void } => {
  const [{ status, token }, setStatusToken] = useState<{ status: number; token: string }>({ status: 0, token: '' });
  const { setUserToken } = useContext(UserContext);
  const headers = {
    'Content-Type': 'application/json',
  };

  // The post request is not performed at hook declaration, but after the value is changed
  useDidMountEffect(() => {
    axios
      .post('/api/users/register/', JSON.stringify(user), {
        headers: headers,
      })
      // After a response is recieved, retrieve its status code
      .then(
        (res) => setStatusToken({ status: res.status, token: res.data.token }),
        // Get the token from the result if the login was successful
      )
      .catch((err) => {
        console.log(err);
        return setStatusToken({ status: err.response.status, token: '' });
      });
  }, [setStatusToken, user]);

  // When token is updated, the context userToken should also be updated if token is not empty
  useDidMountEffect(() => {
    if (token != '') {
      // Set the userToken - and we have a successful login
      setUserToken(token);
    }
  }, [token]);

  // The function to reset the status
  const resetStatus = useCallback(() => {
    setStatusToken({ status: 0, token: token });
  }, [setStatusToken]);

  return { status, resetStatus };
};

/**
 * A hook to login a user with a username and password. Setting the userToken as well
 * @param loginUser - object with username and password to log in with
 * @returns A status code that indicates the result of the request
 * @remarks The request is not sent the first time, but when the loginUser is changed.
 */
export const useLoginUser = (loginUser: LoginUser): { status: number; resetStatus: () => void } => {
  const [{ status, token }, setStatusToken] = useState<{ status: number; token: string }>({ status: 0, token: '' });
  const { setUserToken } = useContext(UserContext);
  const headers = {
    'Content-Type': 'application/json',
  };

  // The post request is not performed at hook declaration, but after the value is changed
  useDidMountEffect(() => {
    console.log('Tryign to log in user, token: ', localStorage.getItem('userToken'));

    axios
      .post('/api/users/login/', JSON.stringify(loginUser), {
        headers: headers,
      })
      // After a response is recieved, retrieve its status code
      .then(
        (res) => setStatusToken({ status: res.status, token: res.data.token }),
        // Get the token from the result if the login was successful
      )
      .catch((err) => {
        console.log(err);
        return setStatusToken({ status: err.response.status, token: '' });
      });
  }, [setStatusToken, loginUser]);

  // When token is updated, the context userToken should also be updated if token is not empty
  useDidMountEffect(() => {
    if (token != '') {
      // Set the userToken - and we have a successful login
      setUserToken(token);
    }
  }, [token]);

  // Function ot reset the status
  const resetStatus = useCallback(() => {
    setStatusToken({ status: 0, token: token });
  }, [setStatusToken]);

  return { status, resetStatus };
};
