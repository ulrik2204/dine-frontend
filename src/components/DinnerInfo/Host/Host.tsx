import React, { useState } from 'react';
//This will display the host of the dinner event.
const Host: React.FunctionComponent = () => {
  const host = useState('midlertidig');

  return (
    <div>
      <h1>Vert</h1>
      <h3>{host}</h3>
      <br />
    </div>
  );
};

export default Host;
