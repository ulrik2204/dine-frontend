import React from 'react';
import './Menu.css';
import { ReactComponent as ReactLogo } from '../../assets/dine_logo.svg';
import { AppBar, createStyles, makeStyles, Theme } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appbar: {
      background: '#370617',
      color: '#E85D04',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Roboto', sans-serif",
    },
  }),
);
const Menu: React.FunctionComponent = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appbar}>
      <ReactLogo id="headerLogo" />
      <h1 id="header">dine</h1>
    </AppBar>
  );
};

export default Menu;
