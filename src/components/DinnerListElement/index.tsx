//import './DinnnerEventListElement.css';
import React, { useEffect } from 'react';
//import Button from '@material-ui/core/Button';
//import { Dinner } from '../../util/types';
//import axios from 'axios';
import { useGetFromAPI } from '../../actions/apiCalls';
const DinnerEventListElement: React.FunctionComponent = () => {
  const [data, getData] = useGetFromAPI();
  useEffect(() => {
    getData('/api/1');
  }, []);

  return (
    <div>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  );
};

export default DinnerEventListElement;
