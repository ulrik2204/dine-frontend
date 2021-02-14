import React from 'react';
import Course from './Course';
import Image from './Image';
import Host from './Host';
import Kitchen from './Kitchen';
import Time from './Time';
//this will display all relevant info about the spesific dinner event.
const DinnerInfo: React.FunctionComponent = () => {
  return (
    <div>
      <Course />
      <Image />
      <Host />
      <Kitchen />
      <Time />
    </div>
  );
};

export default DinnerInfo;
