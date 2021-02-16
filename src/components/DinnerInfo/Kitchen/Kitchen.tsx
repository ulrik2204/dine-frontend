import React, { useState } from 'react';
//This will state what kitchen the course belongs to.
const Kitchen: React.FunctionComponent = () => {
  const kitchen = useState('Italiensk');
  return (
    <div className="dinnerContainer">
      <h1>Kjøkken</h1>
      <h3>{kitchen}</h3>
    </div>
  );
};

export default Kitchen;
