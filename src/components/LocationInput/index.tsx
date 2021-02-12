import { useState } from 'react';

const LocationInput: React.FunctionComponent = () => {
  const [location, setLocation] = useState('');
  return (
    <div>
      <h2>lokasjon</h2>
      <input onChange={(event) => setLocation(event.target.value)}>Karl Johan 1</input>
    </div>
  );
};

export default LocationInput;
