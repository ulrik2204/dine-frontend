import { Button, List } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useGetFromAPI } from '../../actions/apiCalls';
import DinnerListElement from '../../components/DinnerListElement';
import { Dinner } from '../../util/types';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';

/**
 * The overview page component
 */
const Overview: React.FunctionComponent = () => {
  // API and history hooks
  const [data, getData] = useGetFromAPI();
  const history = useHistory();

  // On render, get all data fromi the API
  useEffect(() => {
    getData('/api/');
  }, []);

  return (
    <div className={styles.overviewDiv}>
      .
      <div className={styles.overviewContent}>
        <div className={styles.buttonDiv}>
          <Button variant="contained" onClick={() => history.push('/createdinnerevent')}>
            Lag middag
          </Button>
        </div>

        <List className={styles.dinnerList}>
          {(() => {
            const content: JSX.Element[] = [];
            if (data != undefined) {
              (data as Dinner[]).forEach((dinner: Dinner) => {
                content.push(<DinnerListElement dinner={dinner} key={dinner.id} />);
              });
            }
            return content;
          })()}
        </List>
      </div>
    </div>
  );
};
export default Overview;
