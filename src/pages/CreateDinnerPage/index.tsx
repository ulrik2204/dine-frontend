import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import { useGetAllAllergiesFromAPI, usePostDinnerToAPI } from '../../actions/apiCalls';
import { Dinner } from '../../util/types';
import { useHistory } from 'react-router-dom';
import useDidMountEffect from '../../actions/useDidMountEffect';
import styles from './styles.module.css';
import { StylesProvider } from '@material-ui/core/styles';
import { defaultDinner } from '../../util/constants';
import Select from '@material-ui/core/Select';
import { Checkbox, FormControl, Input, ListItemText, MenuItem } from '@material-ui/core';

/**
 * The component page for creating a dinner element
 */
const CreateDinnerPage: React.FunctionComponent = () => {
  // Input
  const [dish, setDish] = useState('');
  const [cuisine, setCuisine] = useState('Andre');
  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const [location, setLocation] = useState('');
  const [allergy, setAllergy] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [dinnerState, setDinnerState] = useState<Dinner>(defaultDinner);
  const status = usePostDinnerToAPI(dinnerState);
  const history = useHistory();
  const allergies = useGetAllAllergiesFromAPI();

  // The function for taking in the form input and sening it as a post request to the backend
  const sendForm = useCallback(
    (dish: string, cuisine: string, date: string, location: string, owner: number, description: string) => {
      // Check if the input is correct
      if (dish === '' || cuisine === '' || location === '' || owner == undefined) {
        alert('Du må skrive inn alle feltene');
        return;
      }
      // Not checking date, as a datefield is used to secure this.
      // If a request with a bad date is sent directly to the backend,
      //the backend will handle that

      // The sent dinner event
      const dinner: Dinner = {
        dish: dish,
        cuisine: cuisine,
        date: date,
        location: location,
        owner: owner,
      };
      setDinnerState(dinner);
    },
    [],
  );

  // When the status is recieved, move to the
  useDidMountEffect(() => {
    if (status == 201) {
      alert('Middagen ble opprettet!');
      history.push('/');
    } else {
      alert('Noe gikk galt, prøv på nytt');
    }
  }, [status]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAllergy(event.target.value as SetStateAction<string[]>);
  };

  return (
    <StylesProvider injectFirst>
      <div className={styles.createDinnerContainer}>
        <h1 className={'title'}>Opprett Middag</h1>
        <h2 className={styles.createDinnerH2}>Rett</h2>
        <TextField
          className={styles.inputField}
          value={dish}
          onChange={(event) => setDish(event.target.value)}
        ></TextField>
        <br></br>
        <h2 className={styles.createDinnerH2}>Kjøkken</h2>
        <NativeSelect className={styles.inputField} onChange={(e) => setCuisine(e.target.value)}>
          <option value={'Andre'}>Andre</option>
          <option value={'Fransk'}>Fransk</option>
          <option value={'Indisk'}>Indisk</option>
          <option value={'Italiensk'}>Italiensk</option>
          <option value={'Japansk'}>Japansk</option>
          <option value={'Kinesisk'}>Kinesisk</option>
          <option value={'Meksikansk'}>Meksikansk</option>
          <option value={'Norsk'}>Norsk</option>
        </NativeSelect>
        <br></br>
        <h2 className={styles.createDinnerH2}>Tidspunkt</h2>
        <form noValidate>
          <TextField
            onChange={(event) => setDateTime(event.target.value)}
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            value={dateTime}
            className={styles.inputField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <br></br>
        <h2 className={styles.createDinnerH2}>Sted</h2>
        <TextField
          className={styles.inputField}
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        ></TextField>
        <br></br>
        <br></br>
        <h2 className={styles.createDinnerH2}>Beskrivelse</h2>
        <TextField
          className={styles.inputField}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></TextField>
        <h2 className={styles.createDinnerH2}>Allergi</h2>
        <br></br>

        <FormControl className={styles.inputField}>
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
        <br></br>
        <br></br>

        <div className={styles.buttonDiv}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => sendForm(dish, cuisine, dateTime, location, 1, description)}
            className={styles.buttonField}
          >
            Opprett
          </Button>
        </div>
      </div>
    </StylesProvider>
  );
};
export default CreateDinnerPage;
