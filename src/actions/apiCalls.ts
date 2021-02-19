import axios from 'axios';
import { useCallback, useState } from 'react';
import { Dinner } from '../util/types';

/**
 * A hook retrieving the data from the backend
 * @return a variable the fetched data will be placed in, and a function to get the data
 */
/* eslint-disable no-unused-vars */
export const useGetFromAPI = (): [Dinner[] | undefined, (urlPath: string) => void] => {
  const [data, setData] = useState<Dinner[]>();

  // The actual GET request for a URL
  const getDinnerData = useCallback(
    (urlPath: string) => {
      axios
        .get<Dinner[]>(urlPath)
        // After the response is recieved, take that data and put it in a state
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    },
    [setData],
  );
  // Return that state
  return [data, getDinnerData];
};

/**
 * A function for posting a Dinner to the API
 * @param urlPath The path of the url after http://localhost:8000
 * @param dinner The dinner object to post
 * @return Status code as a number, indicating if the request was successful
 */
export const usePostToAPI = (): [number | undefined, (urlPath: string, dinner: Dinner) => void] => {
  const [status, setStatus] = useState<number>();
  const headers = {
    'Content-Type': 'application/json',
  };
  // The actual post request
  const postDinner = useCallback(
    (urlPath: string, dinner: Dinner): void => {
      axios
        .post(urlPath, JSON.stringify(dinner), {
          headers: headers,
        })
        // After a response is recieved, retrieve its status code
        .then((res) => setStatus(res.status))
        .catch((err) => console.log(err));
    },
    [setStatus],
  );
  return [status, postDinner];
};
/* eslint-enable no-unused-vars */
