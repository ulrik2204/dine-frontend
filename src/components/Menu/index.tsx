import { AppBar } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ReactLogo } from '../../assets/dine_logo.svg';
import { ReactComponent as UserIcon } from '../../assets/user.svg';
import UserContext from '../../util/UserContext';
import styles from './styles.module.css';

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
