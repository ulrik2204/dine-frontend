import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Allergy, Dinner } from '../util/types';
import useDidMountEffect from './useDidMountEffect';

// A default, emtpy dinner object
const defaultDinner: Dinner = {
  dish: '',
  cuisine: '',
  date: '2021-03-15',
  location: '',
  owner: 1,
};

// A default, empty Allergy element
const defaultAllergy: Allergy = {
  allergy: '',
};

/**
 * A hook for retrieving the data from the backend
 * @param urlPath The path of the url to get from after https://localhost:8000
 * @return The data fetched from the API
 */
const useGetFromAPI = (urlPath: string): any => {
  const [data, setData] = useState();

  // The function to perform the GET request.
  useEffect(() => {
    axios
      .get(urlPath)
      // After the response is recieved, take that data and put it in a state
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [setData, urlPath]);
  // Return that state
  return data;
};

/**
 * A hook for posting a Dinner to the API
 * @param urlPath The string path to post to of the url after https://localhost:8000
 * @return An array of a status code as a number, indicating if the request was successful,
 * and a function to perform the POST request and place the status code in the
 * other returned variable.
 *
 * @remarks
 * The first element of the array is the status variable, which is a number.
 * The status is only valid if it is not 0.
 *
 * The second element of the array is the returned function.
 *
 * It takes in
 * @param obj The object to POST to the API.
 *
 */
const usePostToAPI = (urlPath: string): [number, (obj: object) => void] => {
  const [status, setStatus] = useState<number>(0);
  const headers = {
    'Content-Type': 'application/json',
  };

  // The function to perform the POST request
  const postObj = useCallback(
    (obj: object): void => {
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
    },
    [setStatus],
  );
  return [status, postObj];
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
 * @return An array of a status code as a number, indicating if the request was successful,
 * and a function to perform the POST request and place the status code in the
 * other returned variable.
 *
 * @remarks
 * The first element of the array is the status variable, which is a number.
 * The status is only valid if it is not 0.
 *
 * The second element of the array is the returned function.
 *
 * It takes in
 * @param dinner The dinner object to POST to the API.
 */
export const usePostDinnerToAPI = (): [number, (dinner: Dinner) => void] => {
  const [status, postDinner] = usePostToAPI('/api/dinners/');
  return [status, postDinner];
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
