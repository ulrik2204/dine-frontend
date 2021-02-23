import React from 'react';
import './Menu.css';
import { ReactComponent as ReactLogo } from '../../assets/dine_logo.svg';
import { AppBar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  return (
    <div>
      <AppBar position="fixed" className={classes.appbar}>
        <ReactLogo id="headerLogo" onClick={() => history.push('/')} />
        <h1 id="header" onClick={() => history.push('/')}>
          dine
        </h1>
      </AppBar>
    </div>
  );
};

export default Menu;
