import { useState } from 'react';
import axios from '../myaxios';
import useDidMountEffect from './useDidMountEffect';

/**
 * A hook to retrieve a list of the names of allergies from a list of allergy ids.
 * @param allergyIDs - The list of allergy ids you want to get the name of
 * @returns The list of the corresponding names the ids in the list of allergyIDs
 */
export const retrieveAllergies = (allergyIDs: number[], immediate = true): string[] => {
  const [allergies, setAllergies] = useState<string[]>([]);

  useDidMountEffect(
    () => {
      const promises: Promise<string>[] = [];
      allergyIDs?.forEach((id) => {
        promises.push(axios.get(`/api/allergies/${id}/`).then((res) => res.data.allergy));
      });
      Promise.all(promises).then((res) => setAllergies(res));
    },
    [allergyIDs],
    immediate,
  );
  return allergies;
};

/**
 * A hook converting a list of user IDs to a list of their full names
 * @param userIDs The user IDs to convert to full names
 * @param immediate If the request should be done immediately
 * @returns A list of the correesponding full name to each id.
 */
export const retrieveUsers = (userIDs: number[], immediate = true): string[] => {
  const [users, setUsers] = useState<string[]>([]);

  useDidMountEffect(
    () => {
      const promises: Promise<string>[] = [];
      userIDs?.forEach((id) => {
        promises.push(axios.get(`/api/users/${id}/`).then((res) => `${res.data.first_name} ${res.data.last_name}`));
      });
      Promise.all(promises).then((res) => setUsers(res));
    },
    [userIDs],
    immediate,
  );
  return users;
};
