import { useEffect, useState } from 'react';
import axios from '../myaxios';

/**
 * A hook to retrieve a list of the names of allergies from a list of allergy ids.
 * @param allergyIDs - The list of allergy ids you want to get the name of
 * @returns The list of the corresponding names the ids in the list of allergyIDs
 */
export const retrieveAllergies = (allergyIDs: number[]): string[] => {
  const [allergies, setAllergies] = useState<string[]>([]);

  useEffect(() => {
    const promises: Promise<string>[] = [];
    allergyIDs?.forEach((id) => {
      promises.push(axios.get(`/api/allergies/${id}/`).then((res) => res.data.allergy));
    });
    Promise.all(promises).then((res) => setAllergies(res));
  }, [allergyIDs]);
  return allergies;
};

export const retrieveUsers = (userIDs: number[]): string[] => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const promises: Promise<string>[] = [];
    userIDs?.forEach((id) => {
      promises.push(axios.get(`/api/users/${id}/`).then((res) => `${res.data.first_name} ${res.data.last_name}`));
    });
    Promise.all(promises).then((res) => setUsers(res));
  });
  return users;
};
