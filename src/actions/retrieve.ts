import axios from '../myaxios';
import { useEffect, useState } from 'react';

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
      promises.push(axios.get(`/api/allergies/${id}`).then((res) => res.data.allergy));
    });
    Promise.all(promises).then((res) => setAllergies(res));
  }, [allergyIDs]);
  return allergies;
};
