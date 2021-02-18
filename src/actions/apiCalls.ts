import axios from 'axios';
import { useEffect, useState } from 'react';
import { Dinner } from '../util/types';

/**
 * A hook retrieving the data from the backend
 * @param urlPath the path of the url after http://localhost:8000
 * @return a dinner object including all the parameters of Dinner
 */
export const useFetchFromAPI = (urlPath: string): Dinner[] => {
  const [state, setState] = useState<Dinner[]>([{ id: 0, dish: '', cuisine: '', date: '', location: '', owner: '' }]);

  useEffect(() => {
    // The actual GET request
    axios
      .get<Dinner[]>(urlPath)
      // After the response is recieved, take that data and put it in a state
      .then((res) => setState(res.data))
      .catch((err) => console.log(err));
  }, [urlPath, setState]);
  // Return that state
  return state;
};

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
