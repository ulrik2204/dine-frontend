// import './DinnnerListElement.css';
import React from 'react';
import { Dinner } from '../../util/types';
import { Avatar, createStyles, Grid, Paper, Theme, Typography } from '@material-ui/core';
import DinnerAvatar from '../../assets/italian.jpg';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import { StylesProvider } from '@material-ui/core/styles';

// Props for the DinnerListelement
type DinnerLEProps = {
  dinner: Dinner;
};

/**
 * The component for displaying a preview of a Dinner event as a list element
 * @param props The dinner element to diplay in the list element
 */
const DinnerListElement: React.FunctionComponent<DinnerLEProps> = (props: DinnerLEProps) => {
  // const styles = useStyles();
  const history = useHistory();

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
                    {props.dinner.owner} er vert
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
