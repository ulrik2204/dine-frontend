import { Button, List } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useGetFromAPI } from '../../actions/apiCalls';
import DinnerListElement from '../../components/DinnerListElement';
import './Overview.css';
import OverviewBackground from '../../assets/ingredients3.jpg';
import { Dinner } from '../../util/types';
import { useHistory } from 'react-router-dom';

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
    <div
      id="overviewDiv"
      style={{
        backgroundImage: `url(${OverviewBackground})`,
        backgroundRepeat: 'no-repeat',
        height: '100%',
      }}
    >
      .
      <div id="overviewContent">
        <div style={{ textAlign: 'center', marginBottom: '1vh' }}>
          <Button variant="contained" onClick={() => history.push('/createdinnerevent')}>
            Lag middag
          </Button>
        </div>

        <List style={{ overflow: 'auto', maxHeight: '68vh' }}>
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
