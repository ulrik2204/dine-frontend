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
 * @return An array of a variable the fetched data will be placed in,
 * and a function to perform the GET request and place the data in
 * the other returned variable.
 *
 * @remarks
 * The first element of the array is the data variable, which is a Dinner object.
 * The other element of the array is the returned function.
 *
 *
 */
/* eslint-disable no-unused-vars */
const useGetFromAPI = (urlPath: string): [any, () => void] => {
  const [data, setData] = useState();

  // The function to perform the GET request.
  const getData = useCallback(() => {
    axios
      .get(urlPath)
      // After the response is recieved, take that data and put it in a state
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [setData]);
  // Return that state
  return [data, getData];
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
 * Method to get all Dinners from the API
 * @returns An array consisting of a variable and a function.
 *
 * @remarks
 * The first element in the array is the list of Dinner objects from the backend
 * The second element in the array is the functuon to perform the GET
 * request and place the result in the variable mentioned above.
 */
export const useGetAllDinnersFromAPI = (): [Dinner[], () => void] => {
  const [dinnerListAPI, getAllDinners] = useGetFromAPI('/api/dinners/');
  // The DinnerList cannot be undefined, thus it returns a default dinner
  const [dinnerList, setDinnerList] = useState([defaultDinner]);
  // Update dinnerList when the dinnerListAPI changes, but not on first render
  // because then the dinnerListAPI is null
  useDidMountEffect(() => {
    setDinnerList(dinnerListAPI);
  }, [dinnerListAPI]);
  return [dinnerList as Dinner[], getAllDinners];
};

/**
 * A hook to get a single Dinner from the API
 * @param id The id of the dinner you want to fetch from the API
 * @returns An array consisting of a variable and a function.
 *
 * @remarks
 * The first element in the array is the Dinner object from the backend
 * The second element in the array is the functuon to perform the GET
 * request and place the result in the variable mentioned above.
 */
export const useGetDinnerFromAPI = (id: number): [Dinner, () => void] => {
  const [dinnerAPI, getDinner] = useGetFromAPI(`/api/dinners/${id}/`);
  // The DinnerList cannot be undefined, thus it returns a default dinner
  const [dinner, setDinner] = useState(defaultDinner);
  // Update dinner when the dinnertAPI changes, but not on first render
  // because then the dinnerAPI is null
  useDidMountEffect(() => {
    setDinner(dinnerAPI);
  }, [dinnerAPI]);
  return [dinner as Dinner, getDinner];
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

export const useSignUpForDinner = (dinnerID: number) => {

};

/**
 * A GET request to fetch all the allergies registered in the API
 * @return An array of the array of allergies from the API (by default a single emtpy allergy),
 * and a function to perform the GET request and put the result in the aformntioned variable
 */
export const useGetAllAllergiesFromAPI = (): [Allergy[], () => void] => {
  const [allergiesAPI, getAllergiesAPI] = useGetFromAPI('/api/allergies/');
  const [allergies, setAllergies] = useState([defaultAllergy]);

  useDidMountEffect(() => {
    setAllergies(allergiesAPI);
  }, [allergiesAPI]);
  return [allergies as Allergy[], getAllergiesAPI];
};

/**
 * A GET request to fetch one allergy by their ID
 * @return An array consisting of: an allergy (default en emtpy allergy) and a function to get the allergy by the id
 */
export const useGetAllergyFromAPI = (allergyID: number): [Allergy, () => void] => {
  const [allergyAPI, getAllergyAPI] = useGetFromAPI(`/api/allergies/${allergyID}/`);
  const [allergy, setAllergy] = useState(defaultAllergy);

  useDidMountEffect(() => {
    setAllergy(allergyAPI);
  }, [allergyAPI]);
  return [allergy as Allergy, getAllergyAPI];
};



/* eslint-enable no-unused-vars */
