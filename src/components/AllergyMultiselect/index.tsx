import { Checkbox, Input, ListItemText, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { useGetAllAllergiesFromAPI } from '../../actions/apiCalls';
import { Allergy } from '../../util/types';

type AMProps = {
  allergyIDs: number[];
  setAllergyIDs: (a: number[]) => void;
  className: string;
};

const AllergyMultiselect: React.FunctionComponent<AMProps> = ({ allergyIDs, setAllergyIDs, className }) => {
  const allergies = useGetAllAllergiesFromAPI();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAllergyIDs(event.target.value as number[]);
  };
  return (
    <Select
      className={className}
      multiple
      displayEmpty
      value={allergyIDs}
      onChange={handleChange}
      input={<Input />}
      renderValue={(selected) => {
        if ((selected as string[]).length === 0) {
          return 'Velg allergener';
        }
        return (selected as number[])
          .map((sel) => (allergies.find((item) => item.id === sel) as Allergy).allergy)
          .join(', ');
      }}
    >
      <MenuItem key="-1" disabled value={[]}>
        Velg allergener
      </MenuItem>
      {allergies.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          <Checkbox checked={allergyIDs.indexOf(item.id as number) > -1} />
          <ListItemText primary={item.allergy} />
        </MenuItem>
      ))}
    </Select>
  );
};
export default AllergyMultiselect;
