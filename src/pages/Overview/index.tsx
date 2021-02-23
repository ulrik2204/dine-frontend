import { List, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useGetFromAPI } from '../../actions/apiCalls';
import DinnerListElement from '../../components/DinnerListElement';
import './Overview.css';
import OverviewBackground from '../../assets/ingredients3.jpg';
const Overview: React.FunctionComponent = () => {
  const [data, getData] = useGetFromAPI();

  useEffect(() => {
    getData('/api/');
    console.log('Render');
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
      <List style={{ overflow: 'auto', height: '90%', marginTop: '10%' }}>
        {(() => {
          const content: JSX.Element[] = [];
          if (data != undefined) {
            data.forEach((dinner) => {
              content.push(<DinnerListElement dinner={dinner} />);
            });
          }
          return content;
        })()}
      </List>
    </div>
  );
};
export default Overview;
