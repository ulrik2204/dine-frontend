import { useState } from 'react';

const TimeInput: React.FunctionComponent = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  return (
    <div>
      <h2>Tidspunkt</h2>
      <input name="time" onChange={(event) => setTime(event.target.value)}>
        Eks: 23:00
      </input>
      <input name="date" onChange={(event) => setDate(event.target.value)}>
        Eks: 30.12.2021
      </input>
    </div>
  );
};

export default TimeInput;
