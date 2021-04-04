import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import { StylesProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEditDinner, useGetDinnerFromAPI, useGetUserByTokenFromAPI } from '../../actions/apiCalls';
import useDidMountEffect from '../../actions/useDidMountEffect';
import AllergyMultiselect from '../../components/AllergyMultiselect';
import { defaultDinner } from '../../util/constants';
import { areYouSure } from '../../util/toastTemplates';
import { EditDinner } from '../../util/types';
import styles from './styles.module.css';

type EditDinnerPageProps = {
  dinnerID: number;
};

/**
 * The component page for creating a dinner element
 */
const EditDinnerPage: React.FunctionComponent<EditDinnerPageProps> = ({ dinnerID }) => {
  // Getting the dinner by the ID
  const dinnerAPI = useGetDinnerFromAPI(dinnerID, true);
  // Getting the user
  const user = useGetUserByTokenFromAPI(true);
  // Input
  const [dish, setDish] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DDTkk:mm'));
  const [location, setLocation] = useState('');
  const [allergies, setAllergies] = useState<number[]>([]);
  const [description, setDescription] = useState('');
  const [editDinnerState, setEditDinnerState] = useState<EditDinner>(defaultDinner);
  const { status, resetStatus } = useEditDinner(dinnerID, editDinnerState);
  const history = useHistory();

  // When the api calls are recieved, update the input fields
  useDidMountEffect(() => {
    setDish(dinnerAPI.dish);
    setCuisine(dinnerAPI.cuisine);
    setDate(moment(dinnerAPI.date).format('YYYY-MM-DDTkk:mm'));
    setLocation(dinnerAPI.location);
    setAllergies(dinnerAPI.allergies ?? []);
    setDescription(dinnerAPI.description ?? '');
  }, [dinnerAPI, setDish, setCuisine, setDate, setLocation, setAllergies, setDescription]);

  // The function for taking in the form input and sening it as a post request to the backend
  const sendEditDinner = useCallback(() => {
    // Check if the input is correct

    const editDinner: EditDinner = {
      dish: dish != dinnerAPI.dish ? dish : undefined,
      cuisine: cuisine != dinnerAPI.cuisine ? cuisine : undefined,
      date: date != dinnerAPI.date ? date : undefined,
      location: location != dinnerAPI.location ? location : undefined,
      description: description != dinnerAPI.description ? description : undefined,
      allergies: allergies != dinnerAPI.allergies ? allergies : undefined,
    };
    setEditDinnerState(editDinner);
  }, [setEditDinnerState, dish, cuisine, date, location, allergies]);

  // The function to cancel a dinner
  const sendCancelDinner = useCallback(() => {
    areYouSure("Avlyse middagen?", () => setEditDinnerState({ is_canceled: true }))
    
  }, []);
  // When the page is rendered, check if the user has permission, and if not redirect to home
  useDidMountEffect(() => {
    if (user.id === -1 || dinnerAPI.owner === -1) {
      // Then the data from the API is not loaded yet
      return;
    }
    if (user.id != dinnerAPI.owner) {
      toast.warning('Du har ikke lov til å redigere denne middagen');
      history.push('/');
    }
  }, [dinnerAPI, user]);

  // When the status is recieved, play a suitable message
  useDidMountEffect(() => {
    if (status === 200) {
      toast.info('Middagen ble endret!');
      history.push('/');
    } else if (status === 400) {
      toast.error('Noe gikk galt');
      resetStatus();
    } else if (status === 401) {
      toast.warning('Du er ikke logget inn');
      resetStatus();
    } else if (status === 403) {
      toast.warning('Du har ikke lov til å endre denne middagen');
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
            onChange={(event) => setDate(event.target.value)}
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            value={date}
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
          value={description || 'Ingen beskrivelse'}
          onChange={(event) => setDescription(event.target.value)}
        ></TextField>
        <h2 className={styles.editDinnerH2}>Allergi</h2>
        <AllergyMultiselect allergyIDs={allergies} setAllergyIDs={setAllergies} className={styles.inputField} />

        <div className={styles.buttonDiv}>
          <StylesProvider injectFirst>
            <Button variant="contained" color="primary" onClick={() => sendEditDinner()} className={styles.buttonField}>
              Endre middag
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => sendCancelDinner()}
              className={styles.buttonField2}
            >
              Avlys middag
            </Button>

            <br />
            <br />
            <br />
            <Button
              variant="contained"
              color="default"
              onClick={() => history.push(`/dinner/${dinnerID}`)}
              className={styles.buttonField2}
            >
              Avbryt
            </Button>
          </StylesProvider>
        </div>
      </div>
    </StylesProvider>
  );
};
export default EditDinnerPage;
