import React, { useState } from 'react';

//When the dinner event will take place.
const Time: React.FunctionComponent = () => {
  const [time] = useState('04.03.2021');

  return (
    <div>
      <h1>Tidspunkt</h1>
      <h3>{time}</h3>
    </div>
  );
};

export default Time;
