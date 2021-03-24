import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import { StylesProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePostDinnerToAPI } from '../../actions/apiCalls';
import useDidMountEffect from '../../actions/useDidMountEffect';
import AllergyMultiselect from '../../components/AllergyMultiselect';
import { defaultDinner } from '../../util/constants';
import { Dinner } from '../../util/types';
import styles from './styles.module.css';

/**
 * The component page for creating a dinner element
 */
const EditDinnerPage: React.FunctionComponent = () => {
  // Input
  const [dish, setDish] = useState('');
  const [cuisine, setCuisine] = useState('Andre');
  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const [location, setLocation] = useState('');
  const [allergyIDs, setAllergyIDs] = useState<number[]>([]);
  const [description, setDescription] = useState('');
  const [dinnerState, setDinnerState] = useState<Dinner>(defaultDinner);
  const { status, resetStatus } = usePostDinnerToAPI(dinnerState);
  const history = useHistory();

  // The function for taking in the form input and sening it as a post request to the backend
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
      toast.info('Middagen ble endret!');
      history.push('/');
    } else if (status === 200) {
      toast.info('Middagen ble ikke endret');
      resetStatus();
    } else if (status === 400) {
      toast.error('Noe gikk galt');
      resetStatus();
    } else if (status === 401) {
      toast.error('Du er ikke logget inn');
      resetStatus();
    }
  }, [status]);

  return (
    <StylesProvider injectFirst>
      <div className={styles.editDinnerContainer}>
        <h1 className={'title'}>Endre middag</h1>
        <h2 className={styles.editDinnerH2}>Rett</h2>
        <TextField
          className={styles.inputField}
          value={dish}
          onChange={(event) => setDish(event.target.value)}
        ></TextField>
        <h2 className={styles.editDinnerH2}>Kjøkken</h2>
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
        <h2 className={styles.editDinnerH2}>Tidspunkt</h2>
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
        <h2 className={styles.editDinnerH2}>Sted</h2>
        <TextField
          className={styles.inputField}
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        ></TextField>
        <h2 className={styles.editDinnerH2}>Beskrivelse</h2>
        <TextField
          className={styles.inputField}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></TextField>
        <h2 className={styles.editDinnerH2}>Allergi</h2>
        <AllergyMultiselect allergyIDs={allergyIDs} setAllergyIDs={setAllergyIDs} className={styles.inputField} />

        <div className={styles.buttonDiv}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => sendForm(dish, cuisine, dateTime, location, 1, description, allergyIDs)}
            className={styles.buttonField}
          >
            Endre
          </Button>
        </div>
      </div>
    </StylesProvider>
  );
};
export default EditDinnerPage;
