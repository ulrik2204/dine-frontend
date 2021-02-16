import React, { useState } from 'react';

//When the dinner event will take place.
const Time: React.FunctionComponent = () => {
  const [date] = useState('Fredag 22.feb');
  const [time] = useState('18:20');

  return (
    <div className="dinnerContainer">
      <h1>Tidspunkt</h1>
      <div className="dinnerTimeDate">
        <div>
          <h3>{date}</h3>
        </div>

        <div>
          <h3>{time}</h3>
        </div>
      </div>
    </div>
  );
};

export default Time;
