import React from 'react';
import './Menu.css';
import { ReactComponent as ReactLogo } from '../../assets/dine_logo.svg';

const Menu: React.FunctionComponent = () => {
  return (
    <div className="headerPage">
      <ReactLogo id="headerLogo" />
      <h1 id="header">dine</h1>
    </div>
  );
};

export default Menu;
