import './DinnnerListElement.css';
import React, { useEffect } from 'react';
//import Button from '@material-ui/core/Button';
//import { Dinner } from '../../util/types';
//import axios from 'axios';
import { useGetFromAPI } from '../../actions/apiCalls';
import { Dinner } from '../../util/types';
import { Avatar, ButtonBase, createStyles, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import DinnerAvatar from '../../assets/italian.jpg';

type DinnerLEProps = {
  dinner: Dinner;
};
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

const DinnerListElement: React.FunctionComponent<DinnerLEProps> = (props: DinnerLEProps) => {
  const [data, getData] = useGetFromAPI();
  useEffect(() => {
    getData(`/api/${props.dinner.id}`);
    console.log(data);
  }, []);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
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
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  {/*  Remove */}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default DinnerListElement;
