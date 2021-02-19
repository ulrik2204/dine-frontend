import axios from 'axios';
import { useCallback, useState } from 'react';
import { Dinner } from '../util/types';

/**
 * A hook retrieving the data from the backend
 * @return a variable the fetched data will be placed in, and a function to get the data
 */
/* eslint-disable no-unused-vars */
export const useFetchFromAPI = (): [Dinner[] | undefined, (urlPath: string) => void] => {
  const [state, setState] = useState<Dinner[]>();

  // The actual GET request for a URL
  const getDinner = useCallback(
    (urlPath: string) => {
      axios
        .get<Dinner[]>(urlPath)
        // After the response is recieved, take that data and put it in a state
        .then((res) => setState(res.data))
        .catch((err) => console.log(err));
    },
    [setState],
  );
  // Return that state
  return [state, getDinner];
};
/* eslint-enable no-unused-vars */

/**
 * A function for posting a Dinner to the API
 * @param urlPath The path of the url after http://localhost:8000
 * @param dinner The dinner object to post
 * @return Status code as a number, indicating if the request was successful
 */
export const postDinnerToAPI = (urlPath: string, dinner: Dinner): number => {
  let statusCode = 0;
  const headers = {
    'Content-Type': 'application/json',
  };
  // The actual post request
  console.log(JSON.stringify(dinner));
  axios
    .post(urlPath, JSON.stringify(dinner), {
      headers: headers,
    })
    // After a response is recieved, retrieve its status code
    .then((res) => {
      statusCode = res.status;
    })
    .catch((err) => console.log(err));
  return statusCode;
};
