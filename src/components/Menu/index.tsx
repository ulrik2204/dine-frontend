import React from 'react';
import './Menu.css';
const Menu: React.FunctionComponent = () => {
  return (
    <div className="headerPage">
      <img id="headerLogo" src="../../assets/dine_logo.svg" alt="logo" />
      <h1 id="header">dine</h1>
    </div>
  );
};

export default Menu;
