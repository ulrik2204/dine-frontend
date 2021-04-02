// import './DinnnerListElement.css';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGetUserByIDFromAPI } from '../../actions/apiCalls';
import DinnerAvatar from '../../assets/italian.jpg';
import { Dinner } from '../../util/types';
import styles from './styles.module.css';

// Props for the DinnerListelement
type DinnerLEProps = {
  dinner: Dinner;
};

/**
 * The component for displaying a preview of a Dinner event as a list element
 * @param props The dinner element to diplay in the list element
 */
const DinnerListElement: React.FunctionComponent<DinnerLEProps> = (props: DinnerLEProps) => {
  const history = useHistory();
  const owner = useGetUserByIDFromAPI(props.dinner.owner as number);

  return (
    <div className={styles.root}>
      <StylesProvider injectFirst>
        <Paper className={styles.paper} onClick={() => history.push(`/dinner/${props.dinner.id}`)}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar className={styles.image}>
                <img src={DinnerAvatar} alt="Picture" />
              </Avatar>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6">
                    {props.dinner.dish}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.dinner.cuisine}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {props.dinner.location}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {new Date(props.dinner.date).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {owner.first_name + ' ' + owner.last_name} er vert
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

export default DinnerListElement;
