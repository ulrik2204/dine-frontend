import { AxiosRequestConfig } from 'axios';
import { useCallback, useContext, useState } from 'react';
import axios from '../myaxios';
import { defaultAllergy, defaultDinner, defaultUser } from '../util/constants';
import { Allergy, Dinner, EditDinner, LoginUser, RegistrationUser, User } from '../util/types';
import UserContext from '../util/UserContext';
import useDidMountEffect from './useDidMountEffect';

/**
 * A hook to get the headers to be send for a request.
 * @returns A headers object.
 */
export const useGetHeaders = () => {
  const { userToken } = useContext(UserContext);
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
 * @param noheaders - If the request should be sent with headers
 * @returns The data fetched from the API
 */
const useGetFromAPI = (urlPath: string, immediate = true, noheaders = false): any => {
  const [data, setData] = useState<any>();
  const headers = useGetHeaders();
  // The function to perform the GET request.
  useDidMountEffect(
    () => {
      axios
        .get(urlPath, { headers: noheaders ? {} : headers })
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
  const headers = useGetHeaders();

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
  const dinnerListAPI = useGetFromAPI('/api/dinners/', true, true);
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
  const dinnerAPI = useGetFromAPI(`/api/dinners/${id}/`, immediate, true);
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
 * The hook to edit a dinner
 * @param dinnerID The id of the dinner to edit
 * @param editDinner Edit dinner object of the parameters to edit
 * @returns An object of the status of the request, and a method, resetStatus to set status to 0
 * @remarks The request is not sent the first time, but when the dinner object is changed.
 */
export const useEditDinner = (
  dinnerID: number,
  editDinner: EditDinner,
): { status: number; resetStatus: () => void } => {
  const [status, setStatus] = useState<number>(0);
  const headers = useGetHeaders();

  // Making the patch request
  useDidMountEffect(() => {
    axios
      .patch(`/api/dinners/${dinnerID}/`, editDinner, { headers })
      .then((res) => setStatus(res.status))
      .catch((err) => {
        console.log(err);
        setStatus(err.response.status);
      });
  }, [dinnerID, editDinner, setStatus]);

  const resetStatus = useCallback(() => {
    setStatus(0);
  }, [setStatus]);
  return { status, resetStatus };
};

/**
 * Hook to sign the user that is logged in for a dinner.
 * @param dinnerID - The dinner to sign up for
 * @returns An object of the status of the request, and a method, resetStatus to set status to 0
 * @remarks The PUT request is not sent the first time, but when the dinnerID is changed.
 */
export const useSignupForDinner = (dinnerID: number, immediate = true): { status: number; resetStatus: () => void } => {
  const [status, setStatus] = useState<number>(0);
  const headers = useGetHeaders();

  // The post request is not performed at hook declaration, but after the value is changed
  useDidMountEffect(
    () => {
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
    },
    [setStatus, dinnerID],
    immediate,
  );

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

/**
 * Hook to determine of the logged in user is admin
 * @param immedate If the request should be sent immediately or not
 * @returns True if the User is a superuser (admin) and false otherwise
 */
export const useIsLoggedInUserAdmin = (immedate = true): boolean => {
  return useGetFromAPI('/api/users/isadmin/', immedate)?.is_admin ?? false;
};

export const isUserAdmin = (headers?: AxiosRequestConfig['headers']): Promise<boolean> => {
  return axios.get('/api/users/isadmin/', { headers }).then((res) => res.data.is_admin);
};

export const deleteUser = (userID: number, headers?: AxiosRequestConfig['headers']): Promise<number> => {
  // The delete request is not performed immediately
  if (userID !== -1) {
    return (
      axios
        .delete(`/api/users/${userID}/`, {
          headers: headers,
        })
        // After a response is recieved, retrieve its status code
        .then((res) => res.status)
        .catch((err) => {
          console.log(err);
          return err.response.status;
        })
    );
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(0);
    }, 1);
  });
};
