import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useGetDinnerFromAPI, useGetUserByIDFromAPI, useGetUserByTokenFromAPI } from '../../actions/apiCalls';
import { retrieveAllergies } from '../../actions/retrieve';
import '../../fonts/Roboto-Thin.ttf';
import styles from './styles.module.css';

// All you need to see a dinner page is the dinnerID
type DinnerPageProps = {
  dinnerID: number;
};

/**
 * Component for dinner page.
 */
const DinnerPage: React.FunctionComponent<DinnerPageProps> = (props: DinnerPageProps) => {
  const dinner = useGetDinnerFromAPI(props.dinnerID);
  const loginUser = useGetUserByTokenFromAPI(true);
  const user = useGetUserByIDFromAPI(dinner.owner as number, false);
  const allergies = retrieveAllergies(dinner.allergies as number[], false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    if (loginUser.id == -1 || dinner.id == -1) {
      return;
    }
    if (loginUser.id == dinner.owner) {
      setIsOwner(true);
    }
  }, [dinner, loginUser]);

  return (
    <div className={styles.dinnerPageContainer}>
      <h1 className="title">{dinner?.dish}</h1>
      <img
        className={styles.dinnerPageImage}
        src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        alt="Matbilde"
      />
      <h1 className={styles.dinnerPageH1}>Vert</h1>
      <h3 className={styles.dinnerPageH3}>{user.first_name + ' ' + user.last_name}</h3>

      <h1 className={styles.dinnerPageH1}>Kjøkken</h1>
      <h3 className={styles.dinnerPageH3}>{dinner.cuisine}</h3>

      <h1 className={styles.dinnerPageH1}>Tidspunkt</h1>
      <h3 className={styles.dinnerPageH3}>{new Date(dinner?.date).toLocaleString()}</h3>

      <h1 className={styles.dinnerPageH1}>Sted</h1>
      <h3 className={styles.dinnerPageH3}>{dinner.location}</h3>

      <h1 className={styles.dinnerPageH1}>Allergier</h1>
      <h3 className={styles.dinnerPageH3}>{allergies.join(', ') || 'Ingen allergier'}</h3>

      <h1 className={styles.dinnerPageH1}>Beskrivelse</h1>
      <h3 className={styles.dinnerPageH3}>{dinner.description || 'Ingen beskrivelse'}</h3>
      {/* 
      <button className={classes.signUp}>
        Meld på
      </button> */}
      {(() => {
        if (isOwner) {
          return (
            <Button variant="contained" color="default" onClick={() => history.push(`/dinner/${props.dinnerID}/edit`)}>
              Endre middag
            </Button>
          );
        }
      })()}
    </div>
  );
};
export default DinnerPage;
