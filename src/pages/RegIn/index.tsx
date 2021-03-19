import { Button, TextField } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useState } from 'react';
import styles from './styles.module.css';
import { StylesProvider } from '@material-ui/core/styles';
import { Select } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import { useGetAllAllergiesFromAPI } from '../../actions/apiCalls';
import { toast } from 'react-toastify';

const RegInPage: React.FunctionComponent = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [allergy, setAllergy] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const allergies = useGetAllAllergiesFromAPI();

  const sendRegIn = useCallback(
    (name: string, userName: string, address: string, allergy: string[], password: string, password2: string) => {
      // Check if the input is correct
      if (name === '' || userName === '' || address === '' || password === '' || password2 === '') {
        toast.warn('Du må skrive inn i alle feltene');
        return;
      }
    },
    [],
  );

  // Handle changes for dropdown allergy
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAllergy(event.target.value as string[]);
  };

  return (
    <StylesProvider injectFirst>
      <div className={styles.regInPage}>
        <h1>Register deg</h1>
        <h2 className={styles.inputText}>Navn</h2>
        <TextField className={styles.input} value={name} onChange={(event) => setName(event.target.value)}></TextField>
        <h2 className={styles.inputText}>Epost</h2>
        <TextField
          className={styles.input}
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        ></TextField>
        <h2 className={styles.inputText}>Adresse</h2>
        <TextField
          className={styles.input}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        ></TextField>
        <h2 className={styles.inputText}>Allergier</h2>
        <FormControl className={styles.input}>
          <Select
            labelId="demo-mutiple-checkbox-label"
            id="demo-mutiple-checkbox"
            multiple
            value={allergy}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) => (selected as string[]).join(', ')}
          >
            {allergies.map((item) => (
              <MenuItem key={item.id} value={item.allergy}>
                <Checkbox checked={allergy.indexOf(item.allergy) > -1} />
                <ListItemText primary={item.allergy} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <h2 className={styles.inputText}>Passord</h2>
        <TextField
          className={styles.input}
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        ></TextField>
        <h2 className={styles.inputText}>Gjenta passord</h2>
        <TextField
          className={styles.input}
          value={password2}
          type="password"
          onChange={(event) => setPassword2(event.target.value)}
        ></TextField>
        <Button
          className={styles.regInButton}
          onClick={() => sendRegIn(name, userName, address, allergy, password, password2)}
        >
          Registrer
        </Button>
      </div>
    </StylesProvider>
  );
};
export default RegInPage;
