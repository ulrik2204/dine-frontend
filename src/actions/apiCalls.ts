import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { defaultAllergy, defaultDinner, defaultUser } from '../util/constants';
import { Allergy, Dinner, User, RegistrationUser, LoginUser } from '../util/types';
import UserContext from '../util/UserContext';
import useDidMountEffect from './useDidMountEffect';

/**
 * A hook for retrieving the data from the backend
 * @param urlPath The path of the url to get from after https://localhost:8000
 * @return The data fetched from the API
 */
const useGetFromAPI = (urlPath: string): any => {
  const [data, setData] = useState();
  const { userToken } = useContext(UserContext);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: '',
  };
  if (userToken != '') {
    headers.Authorization = 'Token ' + userToken;
  }
  // The function to perform the GET request.
  useEffect(() => {
    axios
      .get(urlPath, { headers: headers })
      // After the response is recieved, take that data and put it in a state
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [setData, urlPath]);
  // Return that state
  return data;
};

/**
 * The hook to perform a POST request to the API
 * @param urlPath The urlpath to send the post request to (path after localhost:8000)
 * @param obj The object to post
 * @remarks
 * The request is not sent the first time, but when the onject or urlPath is changed.
 */
const usePostToAPI = (urlPath: string, obj: object): number => {
  const [status, setStatus] = useState<number>(0);
  const { userToken } = useContext(UserContext);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: '',
  };
  if (userToken != '') {
    headers.Authorization = 'Token ' + userToken;
  }

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
        setStatus(400);
      });
  }, [setStatus, urlPath, obj]);
  return status;
};

/**
 * Hook to get all Dinners from the API
 * @returns All dinners in the API
 */
export const useGetAllDinnersFromAPI = (): Dinner[] => {
  const dinnerListAPI = useGetFromAPI('/api/dinners/');
  // The DinnerList cannot be undefined, thus it returns a default dinner
  const [dinnerList, setDinnerList] = useState([defaultDinner]);
  // Update dinnerList when the dinnerListAPI changes, but not on first render
  // because then the dinnerListAPI is null
  useDidMountEffect(() => {
    setDinnerList(dinnerListAPI);
  }, [dinnerListAPI]);
  return dinnerList as Dinner[];
};

/**
 * A hook to get a single Dinner from the API
 * @param id The id of the dinner you want to fetch from the API
 * @returns The dinner with that id in the API
 */
export const useGetDinnerFromAPI = (id: number): Dinner => {
  const dinnerAPI = useGetFromAPI(`/api/dinners/${id}/`);
  // The DinnerList cannot be undefined, thus it returns a default dinner
  const [dinner, setDinner] = useState(defaultDinner);
  // Update dinner when the dinnertAPI changes, but not on first render
  // because then the dinnerAPI is null
  useDidMountEffect(() => {
    setDinner(dinnerAPI);
  }, [dinnerAPI]);
  return dinner as Dinner;
};

/**
 * A post request to post a dinner to the API
 * @param dinner The dinner object to POST to the API.
 * @returns The http status number
 * @remarks
 * The request is not sent the first time, but when the dinner object is changed.
 */
export const usePostDinnerToAPI = (dinner: Dinner): number => {
  return usePostToAPI('/api/dinners/', dinner);
};

/**
 * Hook to sign the user that is logged in for a dinner.
 * @param dinnerID The dinner to sign up for
 * @returns A HTTP status number
 * @remarks The PUT request is not sent the first time, but when the dinnerID is changed.
 */
export const useSignupForDinner = (dinnerID: number): number => {
  const [status, setStatus] = useState<number>(0);
  const { userToken } = useContext(UserContext);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: '',
  };
  if (userToken != '') {
    headers.Authorization = 'Token ' + userToken;
  }

  // The post request is not performed at hook declaration, but after the value is changed
  useDidMountEffect(() => {
    axios
      .put(`/api/dinners/${dinnerID}/signup/`, JSON.stringify({}), {
        headers: headers,
      })
      // After a response is recieved, retrieve its status code
      .then((res) => setStatus(res.status))
      .catch((err) => {
        console.log(err);
        setStatus(400);
      });
  }, [setStatus, dinnerID]);
  return status;
};

/**
 * A GET request to fetch all the allergies registered in the API
 * @return All the Allergies registered in the API
 */
export const useGetAllAllergiesFromAPI = (): Allergy[] => {
  const allergiesAPI = useGetFromAPI('/api/allergies/');
  const [allergies, setAllergies] = useState([defaultAllergy]);

  useDidMountEffect(() => {
    setAllergies(allergiesAPI);
  }, [allergiesAPI]);
  return allergies as Allergy[];
};

/**
 * A GET request to fetch one allergy by their ID
 * @return An array consisting of: an allergy (default en emtpy allergy) and a function to get the allergy by the id
 */
export const useGetAllergyFromAPI = (allergyID: number): Allergy => {
  const allergyAPI = useGetFromAPI(`/api/allergies/${allergyID}/`);
  const [allergy, setAllergy] = useState(defaultAllergy);

  useDidMountEffect(() => {
    setAllergy(allergyAPI);
  }, [allergyAPI]);
  return allergy as Allergy;
};

/**
 * Hook t o get all users from API
 * @return All users in the API (not including password)
 */
export const useGetAllUsersFromAPI = (): User[] => {
  const usersAPI = useGetFromAPI('/api/users/');
  const [users, setUsers] = useState([defaultUser]);

  useDidMountEffect(() => {
    setUsers(usersAPI);
  }, [usersAPI]);
  return users as User[];
};
/**
 * Hook to get the data for a single user from the API
 * @param userID The  id of the use to get
 * @returns A user object for the user
 */
export const useGetUserFromAPI = (userID: number): User => {
  const userAPI = useGetFromAPI(`/api/users/${userID}/`);
  const [user, setUser] = useState(defaultUser);

  useDidMountEffect(() => {
    setUser(userAPI);
  }, [userAPI]);
  return user as User;
};

/**
 * A hook register a user to the API
 * @param user The user object to post
 * @returns A HTTP status number
 * @remarks The request is not sent the first time, but when the registerUser is changed.
 */
export const useRegisterUser = (user: RegistrationUser): number => {
  const [{ status, token }, setStatusToken] = useState<{ status: number; token: string }>({ status: 0, token: '' });
  const { userToken, setUserToken } = useContext(UserContext);
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
        return setStatusToken({ status: 400, token: '' });
      });
  }, [setStatusToken, user]);

  // When token is updated, the context userToken should also be updated if token is not empty
  useEffect(() => {
    if (token != '') {
      // Set the userToken - and we have a successful login
      console.log('Hei');
      setUserToken(token);
      console.log(userToken);
    } else {
      // Else, it is a bad request, this should aldready have been logged
      setStatusToken({ status: 400, token: '' });
    }
  }, [token]);

  return status;
};

/**
 * A hook to login a user with a username and password. Setting the userToken as well
 * @param loginUserv object with username and password to log in with
 * @returns A status code that indicates the result of the request
 * @remarks The request is not sent the first time, but when the loginUser is changed.
 */
export const useLoginUser = (loginUser: LoginUser): number => {
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
        return setStatusToken({ status: 400, token: '' });
      });
  }, [setStatusToken, loginUser]);

  // When token is updated, the context userToken should also be updated if token is not empty
  useEffect(() => {
    if (token != '') {
      // Set the userToken - and we have a successful login
      console.log('Hei');
      setUserToken(token);
    } else {
      // Else, it is a bad request, this should aldready have been logged
      setStatusToken({ status: 400, token: '' });
    }
  }, [token]);

  return status;
};
