import React, { useEffect } from 'react';
import '../../fonts/Roboto-Thin.ttf';
import { Dinner } from '../../util/types';
import { useGetFromAPI } from '../../actions/apiCalls';
import useDinnerPageStyles from './stylesDinnerPage';

// All you need to see a dinner page is the dinnerID
type DinnerPageProps = {
  dinnerID: number;
};

/**
 * Component for dinner page.
 */
const DinnerPage: React.FunctionComponent<DinnerPageProps> = (props: DinnerPageProps) => {
  const [dinner, getDinner] = useGetFromAPI();
  const classes = useDinnerPageStyles();
  useEffect(() => {
    getDinner(`/api/${props.dinnerID}`);
  }, []);
  return (
    <div className={classes.dinnerPageContainer}>
      <h1 className="title">{dinner == undefined ? '' : (dinner as Dinner).dish}</h1>
      <img
        className={classes.dinnerPageImage + ' ' + classes.halfWidthLeft}
        src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        alt="Matbilde"
      />
      <h1 className={classes.dinnerPageH1 + ' ' + classes.halfWidthLeft}>Vert</h1>
      <h3 className={classes.dinnerPageH3 + ' ' + classes.halfWidthLeft}>
        {dinner == undefined ? '' : (dinner as Dinner).owner}
      </h3>

      <h1 className={classes.dinnerPageH1 + ' ' + classes.halfWidthLeft}>Kjøkken</h1>
      <h3 className={classes.dinnerPageH3 + ' ' + classes.halfWidthLeft}>
        {dinner == undefined ? '' : (dinner as Dinner).cuisine}
      </h3>

      <h1 className={classes.dinnerPageH1 + ' ' + classes.halfWidthLeft}>Tidspunkt</h1>
      <h3 className={classes.dinnerPageH3 + ' ' + classes.halfWidthLeft}>
        {dinner == undefined ? '' : new Date((dinner as Dinner).date).toLocaleString()}
      </h3>

      <h1 className={classes.dinnerPageH1 + ' ' + classes.halfWidthLeft}>Sted</h1>
      <h3 className={classes.dinnerPageH3 + ' ' + classes.halfWidthLeft}>
        {dinner == undefined ? '' : (dinner as Dinner).location}
      </h3>

      {/* 
      <button className={classes.signUp}>
        Meld på
      </button> */}
    </div>
  );
};
export default DinnerPage;
