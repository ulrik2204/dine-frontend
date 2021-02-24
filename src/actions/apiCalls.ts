import axios from 'axios';
import { useCallback, useState } from 'react';
import { Dinner } from '../util/types';

/**
 * A hook for retrieving the data from the backend
 * @return An array of a variable the fetched data will be placed in,
 * and a function to perform the GET request and place the data in
 * the other returned variable.
 *
 * @remarks
 * The first element of the array is the data variable, which is a Dinner object.
 *
 * The other element of the array is the returned function.
 *
 * It takes in
 * @param urlPath The path of the url after https://localhost:8000
 *
 */
/* eslint-disable no-unused-vars */
export const useGetFromAPI = (): [Dinner[] | Dinner | undefined, (urlPath: string) => void] => {
  const [data, setData] = useState<Dinner[]>();

  // The function to perform the GET request.
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
 * A hook for posting a Dinner to the API
 * @return An array of a status code as a number, indicating if the request was successful,
 * and a function to perform the POST request and place the status code in the
 * other returned variable.
 *
 * @remarks
 * The first element of the array is the status variable, which is a number.
 *
 * The second element of the array is the returned function.
 *
 * It takes in
 * @param urlPath The string path of the url after https://localhost:8000
 * @param dinner The dinner object to POST to the API.
 *
 */
export const usePostToAPI = (): [number | undefined, (urlPath: string, dinner: Dinner) => void] => {
  const [status, setStatus] = useState<number>();
  const headers = {
    'Content-Type': 'application/json',
  };

  // The function to perform the POST request
  const postDinner = useCallback(
    (urlPath: string, dinner: Dinner): void => {
      axios
        .post(urlPath, JSON.stringify(dinner), {
          headers: headers,
        })
        // After a response is recieved, retrieve its status code
        .then((res) => setStatus(res.status))
        .catch((err) => {
          console.log(err);
          setStatus(400);
        });
    },
    [setStatus],
  );
  return [status, postDinner];
};
/* eslint-enable no-unused-vars */
