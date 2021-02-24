import './DinnnerListElement.css';
import React, { useEffect } from 'react';
import { useGetFromAPI } from '../../actions/apiCalls';
import { Dinner } from '../../util/types';
import { Avatar, ButtonBase, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import DinnerAvatar from '../../assets/italian.jpg';
import { useHistory } from 'react-router-dom';

// Props for the DinnerListelement
type DinnerLEProps = {
  dinner: Dinner;
};

// Some styles for this component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
      marginBottom: '12px',
      backgroundColor: '#E85D04',
      color: 'white',
      cursor: 'pointer',
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
    },
  }),
);

/**
 * The component for displaying a preview of a Dinner event as a list element
 * @param props The dinner element to diplay in the list element
 */
const DinnerListElement: React.FunctionComponent<DinnerLEProps> = (props: DinnerLEProps) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} onClick={() => history.push(`/dinner/${props.dinner.id}`)}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar className={classes.image}>
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
    </div>
  );
};

export default DinnerListElement;
