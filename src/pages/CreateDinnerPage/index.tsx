import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import { StylesProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { usePostDinnerToAPI } from '../../actions/apiCalls';
import useDidMountEffect from '../../actions/useDidMountEffect';
import AllergyMultiselect from '../../components/AllergyMultiselect';
import { defaultDinner } from '../../util/constants';
import { Dinner } from '../../util/types';
import UserContext from '../../util/UserContext';
import styles from './styles.module.css';

/**
 * The component page for creating a dinner element
 */
const CreateDinnerPage: React.FunctionComponent = () => {
  // Input
  const [dish, setDish] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [date, setDate] = useState(new Date().toISOString());
  const [location, setLocation] = useState('');
  // The list of allergyIDs of this dinner
  const [allergies, setAllergies] = useState<number[]>([]);
  const [description, setDescription] = useState('');
  const [dinnerState, setDinnerState] = useState<Dinner>(defaultDinner);
  const { status, resetStatus } = usePostDinnerToAPI(dinnerState);
  const history = useHistory();
  const { userToken } = useContext(UserContext);

  // The function for taking in the form input and sending it as a post request to the backend
  const sendForm = useCallback(() => {
    // Check if the input is correct
    if (dish === '' || cuisine === '' || location === '') {
      toast.warn('Du må fylle inn navnet på retten, kjøkken og sted');
      return;
    }
    // Not checking date, as a datefield is used to secure this.
    // If a request with a bad date is sent directly to the backend,
    //the backend will handle that

    // The sent dinner event

    const dinner: Dinner = {
      dish,
      cuisine,
      date,
      location,
      description,
      allergies,
    };
    setDinnerState(dinner);
  }, [dish, cuisine, date, location, description, allergies, setDinnerState]);

  // When the status is recieved, move to the
  useDidMountEffect(() => {
    console.log(status);
    if (status === 201) {
      toast.info('Middagen ble opprettet!');
      history.push('/');
    } else if (status === 200) {
      toast.info('Middagen ble ikke opprettet');
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
      <div className={styles.createDinnerContainer}>
        <h1 className={'title'}>Opprett middag</h1>
        <h2 className={styles.createDinnerH2}>Rett</h2>
        <TextField
          placeholder="Navn på retten"
          className={styles.inputField}
          value={dish}
          onChange={(event) => setDish(event.target.value)}
        ></TextField>
        <h2 className={styles.createDinnerH2}>Kjøkken</h2>
        <NativeSelect value={cuisine} className={styles.inputField} onChange={(e) => setCuisine(e.target.value)}>
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
        </NativeSelect>
        <h2 className={styles.createDinnerH2}>Tidspunkt</h2>
        <form noValidate>
          <TextField
            onChange={(event) => setDate(event.target.value)}
            id="datetime-local"
            label="Tidspunktet middagen finner sted"
            type="datetime-local"
            value={date}
            className={styles.inputField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <h2 className={styles.createDinnerH2}>Sted</h2>
        <TextField
          placeholder="Der middagen finner sted"
          className={styles.inputField}
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        ></TextField>
        <h2 className={styles.createDinnerH2}>Beskrivelse</h2>
        <TextField
          placeholder="Beskrivelse av middagen"
          className={styles.inputField}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></TextField>
        <h2 className={styles.createDinnerH2}>Allergi</h2>
        <br></br>
        <AllergyMultiselect allergyIDs={allergies} setAllergyIDs={setAllergies} className={styles.inputField} />
        <br></br>
        <br></br>

        <div className={styles.buttonDiv}>
          <Button variant="contained" color="primary" onClick={() => sendForm()} className={styles.buttonField}>
            Opprett
          </Button>
        </div>
      </div>
    </StylesProvider>
  );
};
export default CreateDinnerPage;
