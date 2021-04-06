import { NativeSelect } from '@material-ui/core';
import React from 'react';

type CuisineDProps = {
  value: string;
  setValue: (s: string) => void;
  className: string;
};

/**
 * The dropdown for cuisines
 * @param props The value of the dropdown, function to set the value and an optional className
 * @returns The dropdown for the cuisines for the cuisines
 */
const CuisineDropdown: React.FunctionComponent<CuisineDProps> = ({ value, setValue, className }) => {
  return (
    <NativeSelect value={value} className={className} onChange={(e) => setValue(e.target.value)}>
      <option disabled value="" color="gray">
        Velg kjøkken
      </option>
      <option value={'Andre'}>Andre</option>
      <option value={'Fransk'}>Fransk</option>
      <option value={'Indisk'}>Indisk</option>
      <option value={'Italiensk'}>Italiensk</option>
      <option value={'Japansk'}>Japansk</option>
      <option value={'Kinesisk'}>Kinesisk</option>
      <option value={'Meksikansk'}>Meksikansk</option>
      <option value={'Norsk'}>Norsk</option>
      <option value={'Spansk'}>Spansk</option>
      <option value={'Thai'}>Thai</option>
      <option value={'Tyrkisk'}>Tyrkisk</option>
    </NativeSelect>
  );
};

export default CuisineDropdown;
