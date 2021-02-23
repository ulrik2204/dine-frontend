import React, { useEffect } from 'react';
import { useGetFromAPI } from '../../actions/apiCalls';
import './Overview.css';
const Overview: React.FunctionComponent = () => {
  const [data, getData] = useGetFromAPI();

  useEffect(() => {
    getData('/api/');
    console.log('Render');
  }, []);
  return (
    <div id="overviewDiv">
      <h1 className="title">Oversikt</h1>
      {(() => {
        const content: JSX.Element[] = [];
        if (data != undefined) {
          data.forEach((dinner) => {
            content.push(
              <p key={dinner.id} className="dinnerElement">
                {JSON.stringify(dinner)}
              </p>,
            );
          });
        }
        return content;
      })()}
    </div>
  );
};
export default Overview;
