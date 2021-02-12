import { useState } from 'react';

const KitchenInput: React.FunctionComponent = () => {
  const [kitchen, setKitchen] = useState('');
  return (
    <div>
      <h2>Kitchen</h2>
      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <div className="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div>
    </div>
  );
};

export default KitchenInput;
