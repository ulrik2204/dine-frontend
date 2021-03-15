import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import { useGetAllAllergiesFromAPI, useGetAllergyFromAPI, usePostDinnerToAPI } from '../../actions/apiCalls';
import { Allergy, Dinner } from '../../util/types';
import { useHistory } from 'react-router-dom';
import useDidMountEffect from '../../actions/useDidMountEffect';
import styles from './styles.module.css';
import { StylesProvider } from '@material-ui/core/styles';
import { defaultDinner } from '../../util/constants';
import Select from '@material-ui/core/Select';
import { Checkbox, FormControl, Input, ListItemText, MenuItem } from '@material-ui/core';
import { toast } from 'react-toastify';

/**
 * The component page for creating a dinner element
 */
const CreateDinnerPage: React.FunctionComponent = () => {
  // Input
  const [dish, setDish] = useState('');
  const [cuisine, setCuisine] = useState('Andre');
  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const [location, setLocation] = useState('');
  const [allergyIDs, setAllergyIDs] = useState<number[]>([]);
  const [description, setDescription] = useState('');
  const [dinnerState, setDinnerState] = useState<Dinner>(defaultDinner);
  const status = usePostDinnerToAPI(dinnerState);
  const history = useHistory();
  const allergies = useGetAllAllergiesFromAPI();

  // The function for taking in the form input and sending it as a post request to the backend
  const sendForm = useCallback(
    (
      dish: string,
      cuisine: string,
      date: string,
      location: string,
      owner: number,
      description: string,
      allergies: number[],
    ) => {
      // Check if the input is correct
      if (dish === '' || cuisine === '' || location === '' || owner == undefined) {
        toast.warn('Du må fylle inn alle feltene');
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
        description: description,
        allergies: allergies,
      };
      setDinnerState(dinner);
    },
    [],
  );

  // When the status is recieved, move to the
  useDidMountEffect(() => {
    if (status === 201) {
      toast.info('Middagen ble opprettet!');
      history.push('/');
    } else if (status === 200) {
      toast.info('Middagen ble ikke opprettet');
    } else if (status === 400) {
      toast.error('Noe gikk galt');
    } else if (status === 401) {
      toast.error('Du er ikke logget inn');
    }
  }, [status]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAllergyIDs(event.target.value as number[]);
  };

  return (
    <StylesProvider injectFirst>
      <div className={styles.createDinnerContainer}>
        <h1 className={'title'}>Opprett Middag</h1>
        <h2 className={styles.createDinnerH2}>Rett</h2>
        <TextField
          inputProps={{ 'data-testid': 'dishInput' }}
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
            inputProps={{ 'data-testid': 'dateTimeInput' }}
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
          inputProps={{ 'data-testid': 'locationInput' }}
          className={styles.inputField}
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        ></TextField>
        <br></br>
<<<<<<< HEAD
=======
        <h2 className={styles.createDinnerH2}>Vert</h2>
        <TextField
          inputProps={{ 'data-testid': 'ownerInput' }}
          className={styles.inputField}
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
        ></TextField>
        <br />
>>>>>>> cd2b066 (Fix tests)
        <br></br>
        <h2 className={styles.createDinnerH2}>Beskrivelse</h2>
        <TextField
          inputProps={{ 'data-testid': 'descriptionInput' }}
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
            value={allergyIDs}
            onChange={handleChange}
            input={<Input />}
            renderValue={(selected) =>
              (selected as number[])
                .map((sel) => (allergies.find((item) => item.id === sel) as Allergy).allergy)
                .join(', ')
            }
          >
            {allergies.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={allergyIDs.indexOf(item.id as number) > -1} />
                <ListItemText primary={item.allergy} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br></br>
        <br></br>

        <div className={styles.buttonDiv}>
          <Button
            data-testid="sendKnapp"
            variant="contained"
            color="primary"
            onClick={() => sendForm(dish, cuisine, dateTime, location, 1, description, allergyIDs)}
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
