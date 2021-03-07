import React from 'react';
import { ReactComponent as ReactLogo } from '../../assets/dine_logo.svg';
import { AppBar, createStyles, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import { StylesProvider } from '@material-ui/core/styles';

/**
 * Menu component
 */
const Menu: React.FunctionComponent = () => {
  //const styles = useStyles();
  const history = useHistory();
  return (
    <div>
      <StylesProvider injectFirst>
        <AppBar position="fixed" className={styles.appbar}>
          <ReactLogo className={styles.headerLogo} onClick={() => history.push('/')} />
          <h1 className={styles.header} onClick={() => history.push('/')}>
            dine
          </h1>
        </AppBar>
      </StylesProvider>
    </div>
  );
};

export default Menu;
