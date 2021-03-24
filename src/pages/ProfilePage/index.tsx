import { Button } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useGetUserByTokenFromAPI } from '../../actions/apiCalls';
import { retrieveAllergies } from '../../actions/retrieve';
import UserContext from '../../util/UserContext';
import styles from './styles.module.css';

const ProfilePage: React.FunctionComponent = () => {
  const user = useGetUserByTokenFromAPI();
  const { setUserToken } = useContext(UserContext);
  const allergies = retrieveAllergies(user.allergies as number[]);
  const history = useHistory();

  return (
    <div className={styles.profilePageContainer}>
      <h1 className="title">Min profil</h1>
      <h2 className={styles.profilePageH2}>Navn</h2>
      <h3 className={styles.profilePageH3}>
        {user.first_name} {user.last_name}
      </h3>
      <h2 className={styles.profilePageH2}>Brukernavn</h2>
      <h3 className={styles.profilePageH3}>{user.username}</h3>
      <h2 className={styles.profilePageH2}>Adresse</h2>
      <h3 className={styles.profilePageH3}>{user.address}</h3>
      <h2 className={styles.profilePageH2}>Allergier</h2>
      <h3 className={styles.profilePageH3}>{allergies.join(', ') || 'Ingen allergier'}</h3>
      <h2 className={styles.profilePageH2}>Om meg</h2>
      <h3 className={styles.profilePageH3}>{user.about_me || 'Ingen beskrivelse'}</h3>

      <StylesProvider injectFirst>
        <div className={styles.buttonDiv}>
          <Button
            color="primary"
            variant="contained"
            className={styles.buttonField}
            onClick={() => {
              setUserToken('');
              history.push('/');
            }}
          >
            Logg ut
          </Button>
        </div>
      </StylesProvider>
    </div>
  );
};
export default ProfilePage;
