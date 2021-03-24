import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import UserAvatar from '../../assets/italian.jpg';
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
  return (
    <div className={styles.root}>
      <StylesProvider injectFirst>
        <Paper className={styles.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar className={styles.image}>
                <img src={UserAvatar} alt="Picture" />
              </Avatar>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6">
                    {props.user.username}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.user.first_name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.user.last_name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.user.last_name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.user.address}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.user.allergies}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.user.about_me}
                  </Typography>
                </Grid>
                <Grid item>
                  {/* <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Remove
                </Typography> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </StylesProvider>
    </div>
  );
};

export default UserListElement;
