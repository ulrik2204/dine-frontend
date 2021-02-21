import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';

const sendForm = (course: string, kitchen: string, dateTime: string, location: string) => {
  console.log(course, dateTime, location, kitchen);
};

/**
 * The component page for creating a dinner element
 */
const CreateDinnerPage: React.FunctionComponent = () => {
  // Input
  const [course, setCourse] = useState('');
  const [kitchen, setKitchen] = useState('Fransk');
  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const [location, setLocation] = useState('');

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
      <br></br>
      <Button variant="contained" color="primary" onClick={() => sendForm(course, kitchen, dateTime, location)}>
        Opprett
      </Button>
    </div>
  );
};
export default CreateDinnerPage;
