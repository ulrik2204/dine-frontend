import { Checkbox, FormControl, Input, InputLabel, ListItemText, MenuItem, Select } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useGetAllAllergiesFromAPI } from '../../actions/apiCalls';
import { Allergy } from '../../util/types';

type AMProps = {
  allergyIDs: number[];
  setAllergyIDs: (a: number[]) => void;
  className?: string;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

/**
 * The allergy multiselect
 * @param props Consisting of the allergyIDs values that are set, a setAllergyIDs to set them, optional className
 * @returns
 */
const AllergyMultiselect: React.FunctionComponent<AMProps> = ({ allergyIDs, setAllergyIDs, className }) => {
  const allergies = useGetAllAllergiesFromAPI();

  useEffect(() => {
    // Refresh the page with this component once, as the css does not load the first time (error)
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      } else {
        localStorage.removeItem('firstLoad');
      }
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAllergyIDs(event.target.value as number[]);
  };
  return (
    <FormControl className={className}>
      <InputLabel id="demo-mutiple-checkbox-label">Allergier</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        displayEmpty
        value={allergyIDs}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => {
          if ((selected as number[]).length === 0) {
            return '';
          }
          return (selected as number[])
            .map((sel) => (allergies.find((item) => item.id === sel) as Allergy).allergy)
            .join(', ');
        }}
        MenuProps={MenuProps}
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
    </FormControl>
  );
};
export default AllergyMultiselect;
