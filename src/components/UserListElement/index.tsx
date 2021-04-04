import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { deleteUser, getHeaders } from '../../actions/apiCalls';
import { retrieveAllergies } from '../../actions/retrieve';
import UserAvatar from '../../assets/blankprofilepic.svg';
import { areYouSure } from '../../util/toastTemplates';
import { User } from '../../util/types';
import styles from './styles.module.css';

// Props for the UserListelement
type UserLEProps = {
  user: User;
};

/**
 * The component for displaying a preview of a User event as a list element
 * @param props The user element to diplay in the list element
 */
const UserListElement: React.FunctionComponent<UserLEProps> = (props: UserLEProps) => {
  const allergies = retrieveAllergies(props.user.allergies ?? []);
  const headers = getHeaders();

  const performDeleteUser = useCallback(() => {
    areYouSure('Slett denne brukeren?', () => {
      deleteUser(props.user.id as number, headers).then((res) => {
        if (res === 400) {
          toast.error('There was an error deleting the user');
        } else if (res === 204) {
          toast.info(`${props.user.username} was deleted`, { onClose: () => window.location.reload() });
        }
        return;
      });
    });
  }, []);

  return (
    <div className={styles.root}>
      <StylesProvider injectFirst>
        <Paper className={styles.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar className={styles.image}>
                <img src={UserAvatar} alt="Picture" width="130px" />
              </Avatar>
            </Grid>
            <Grid item xs sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6">
                    {props.user.username}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {`${props.user.first_name} ${props.user.last_name}`}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.user.address}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {allergies.join(', ') || 'Ingen allergier'}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.user.about_me || 'Ingen ekstra info'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={() => performDeleteUser()}>
                Slett
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </StylesProvider>
    </div>
  );
};

export default UserListElement;
