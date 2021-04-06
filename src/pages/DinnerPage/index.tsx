import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import {
  useGetDinnerFromAPI,
  useGetUserByIDFromAPI,
  useGetUserByTokenFromAPI,
  useSignupForDinner,
} from '../../actions/apiCalls';
import { retrieveAllergies, retrieveUsers } from '../../actions/retrieve';
import useDidMountEffect from '../../actions/useDidMountEffect';
import ChoosePic from '../../components/ChoosePic';
import '../../fonts/Roboto-Thin.ttf';
import { isLoggedIn } from '../../util/checks';
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
  const [signupDinner, setSignupDinner] = useState(-1);
  const { status, resetStatus } = useSignupForDinner(signupDinner, false);
  const signuedUpUsers = retrieveUsers(dinner.signed_up_users ?? [], false);

  useDidMountEffect(() => {
    if (status === 400) {
      toast.error('Kunne ikke melde deg på middagen. Prøv igjen senere.');
      resetStatus();
    }
  }, [status]);

  useEffect(() => {
    if (loginUser.id === -1 || dinner.id === -1) {
      setIsOwner(false);
    } else if (loginUser.id === dinner.owner) {
      setIsOwner(true);
    }
  }, [dinner, loginUser, setIsOwner]);

  return (
    <div className={styles.dinnerPageContainer}>
      <h1 className="title">{dinner?.dish}</h1>
      {(() => {
        if (dinner.is_canceled) {
          return <h1 style={{ color: 'red' }}>Denne middagen er avlyst</h1>;
        }
      })()}
      <ChoosePic cuisine={dinner.cuisine} className={styles.dinnerPageImage} />
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

      <h1 className={styles.dinnerPageH1}>Påmeldte</h1>
      <h3 className={styles.dinnerPageH3}>{signuedUpUsers.join(', ') || 'Ingen påmeldte'}</h3>
      {(() => {
        if (isOwner && isLoggedIn()) {
          return (
            <Button variant="contained" color="default" onClick={() => history.push(`/dinner/${props.dinnerID}/edit`)}>
              Endre middag
            </Button>
          );
        } else if (!isOwner && dinner.signed_up_users?.indexOf(loginUser.id as number) === -1 && isLoggedIn()) {
          return (
            <Button
              variant="contained"
              color="primary"
              className={styles.signUp}
              onClick={() => {
                setSignupDinner(props.dinnerID);
                window.location.reload();
              }}
            >
              Meld deg på
            </Button>
          );
        }
      })()}
    </div>
  );
};
export default DinnerPage;
