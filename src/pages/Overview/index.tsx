import { Button, List } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useGetAllDinnersFromAPI } from '../../actions/apiCalls';
import DinnerListElement from '../../components/DinnerListElement';
import { Dinner } from '../../util/types';
import styles from './styles.module.css';

/**
 * The overview page component
 */
const Overview: React.FunctionComponent = () => {
  // API and history hooks
  const dinnerList = useGetAllDinnersFromAPI();
  const history = useHistory();

  return (
    <div className={styles.overviewDiv}>
      .
      <div className={styles.overviewContent}>
        <div className={styles.buttonDiv}>
          <Button variant="contained" onClick={() => history.push('/createdinnerevent')}>
            Lag middag
          </Button>
        </div>

        <List>
          {(() => {
            const content: JSX.Element[] = [];
            if (dinnerList != undefined) {
              dinnerList.forEach((dinner: Dinner) => {
                if (!dinner.is_canceled) {
                  content.push(<DinnerListElement dinner={dinner} key={dinner.id} />);
                }
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
