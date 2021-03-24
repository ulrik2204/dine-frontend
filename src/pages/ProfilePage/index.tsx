import { Button } from '@material-ui/core';
import React from 'react';
import styles from './styles.module.css';
import { StylesProvider } from '@material-ui/core/styles';
import { useGetUserFromAPI } from '../../actions/apiCalls';
import UserContext from '../../util/UserContext';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { retrieveAllergies } from '../../actions/retrieve';

const ProfilePage: React.FunctionComponent = () => {
  const user = useGetUserFromAPI(true);
  const { setUserToken } = useContext(UserContext);
  const allergies = retrieveAllergies(user.allergies as number[]);
  const history = useHistory();

  return (
    <StylesProvider injectFirst>
      <div className={styles.profilePage}>
        <h1>Min profil</h1>
        <h2 className={styles.inputText}>Navn</h2>
        <h3 className={styles.input}>
          {user.first_name} {user.last_name}
        </h3>
        <h2 className={styles.inputText}>Brukernavn</h2>
        <h3 className={styles.input}>{user.username}</h3>
        <h2 className={styles.inputText}>Adresse</h2>
        <h3 className={styles.input}>{user.address}</h3>
        <h2 className={styles.inputText}>Allergier</h2>
        <h3 className={styles.input}>{allergies.join(', ') || 'Ingen allergier'}</h3>
        <h2 className={styles.inputText}>Om meg</h2>
        <h3 className={styles.input}>{user.about_me || 'Ingen allergier'}</h3>

        <Button
          className={styles.changeButton}
          onClick={() => {
            setUserToken('');
            history.push('/');
          }}
        >
          Logg ut
        </Button>
      </div>
    </StylesProvider>
  );
};
export default ProfilePage;
