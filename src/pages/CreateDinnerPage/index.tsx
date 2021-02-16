import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';

const CreateDinnerPage: React.FunctionComponent = () => {
  const [course, setCourse] = useState('');
  const [kitchen, setKitchen] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  return (
    <div>
      <h1>Opprett Middag</h1>

      <h2>Rett</h2>
      <input value={course} onChange={(event) => setCourse(event.target.value)}></input>

      <h2>Kitchen</h2>

      <NativeSelect onChange={() => setKitchen('Fransk')}>
        <option value={kitchen}>Fransk</option>
      </NativeSelect>
      {/*
      <div className="dropdown">
        <button value={kitchen} className="dropbtn">
          Dropdown
        </button>
        <div className="dropdown-content">
          <a href="#" onClick={() => setKitchen('Fransk')}>
            Fransk
          </a>
        </div>
      </div>
      */}

      <h2>Tidspunkt</h2>
      <input value={time} name="time" onChange={(event) => setTime(event.target.value)}></input>
      <input value={date} name="date" onChange={(event) => setDate(event.target.value)}></input>

      <h2>Lokasjon</h2>
      <input value={location} onChange={(event) => setLocation(event.target.value)}></input>

      <br></br>
      <br></br>
      <Button variant="contained" color="primary">
        Opprett
      </Button>
    </div>
  );
};
export default CreateDinnerPage;
