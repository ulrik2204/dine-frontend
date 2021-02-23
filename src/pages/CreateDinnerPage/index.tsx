import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import { usePostToAPI } from '../../actions/apiCalls';
import { Dinner } from '../../util/types';
import { useHistory } from 'react-router-dom';
import useDidMountEffect from '../../actions/useDidMountEffect';

/**
 * The component page for creating a dinner element
 */
const CreateDinnerPage: React.FunctionComponent = () => {
  // Input
  const [course, setCourse] = useState('');
  const [kitchen, setKitchen] = useState('Fransk');
  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const [location, setLocation] = useState('');
  const [owner, setOwner] = useState('');
  const [status, post] = usePostToAPI();
  const history = useHistory();

  const sendForm = useCallback((dish: string, cuisine: string, date: string, location: string, owner: string) => {
    const dinner: Dinner = {
      dish: dish,
      cuisine: cuisine,
      date: date,
      location: location,
      owner: owner,
    };
    post('/api/', dinner);
  }, []);

  useDidMountEffect(() => {
    alert('Middagen ble opprettet!');
    history.push('/');
  }, [status]);

  return (
    <div>
      <h1>Opprett Middag</h1>
      <h2>Rett</h2>
      <TextField value={course} onChange={(event) => setCourse(event.target.value)}></TextField>
      <br></br>
      <h2>Kjøkken</h2>
      <NativeSelect onChange={(e) => setKitchen(e.target.value)}>
        <option value={'Fransk'}>Fransk</option>
        <option value={'Italiensk'}>Italiensk</option>
        <option value={'Japansk'}>Japansk</option>
        <option value={'Kinesisk'}>Kinesisk</option>
        <option value={'Norsk'}>Norsk</option>
      </NativeSelect>
      <br></br>
      <h2>Tidspunkt</h2>
      <form noValidate>
        <TextField
          onChange={(event) => setDateTime(event.target.value)}
          id="datetime-local"
          label="Next appointment"
          type="datetime-local"
          value={dateTime}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <br></br>
      <h2>Lokasjon</h2>
      <TextField value={location} onChange={(event) => setLocation(event.target.value)}></TextField>
      <br></br>
      <h2>Vert</h2>
      <TextField value={owner} onChange={(event) => setOwner(event.target.value)}></TextField>
      <br />
      <br></br>
      <Button variant="contained" color="primary" onClick={() => sendForm(course, kitchen, dateTime, location, owner)}>
        Opprett
      </Button>
    </div>
  );
};
export default CreateDinnerPage;
