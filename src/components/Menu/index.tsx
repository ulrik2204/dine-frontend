import React, { useState } from 'react';
import { ReactComponent as ReactLogo } from '../../assets/dine_logo.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import { AppBar } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import { StylesProvider } from '@material-ui/core/styles';
import UserContext from '../../util/UserContext';
import { useContext } from 'react';
import { useGetUserFromAPI } from '../../actions/apiCalls';

/**
 * Menu component
 */
const Menu: React.FunctionComponent = () => {
  const history = useHistory();
  const { userToken } = useContext(UserContext);
  return (
    <div>
      <StylesProvider injectFirst>
        <AppBar position="fixed" className={styles.appbar}>
          <ReactLogo className={styles.headerLogo} onClick={() => history.push('/')} />
          <h1 className={styles.header} onClick={() => history.push('/')}>
            dine
          </h1>
          {(() => {
            if (userToken === '') {
              return (
                <h2 className={styles.login} onClick={() => history.push(`/login`)}>
                  {' '}
                  Logg inn
                </h2>
              );
            }
            return <UserIcon className={styles.userIcon} onClick={() => history.push('/profile')} />;
          })()}
        </AppBar>
      </StylesProvider>
    </div>
  );
};

export default Menu;
