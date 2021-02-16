import React from 'react';
import Course from '../../components/DinnerInfo/Course/Course';
import Host from '../../components/DinnerInfo/Host/Host';
import Image from '../../components/DinnerInfo/Image/Image';
import Kitchen from '../../components/DinnerInfo/Kitchen/Kitchen';
import Time from '../../components/DinnerInfo/Time/Time';

const DinnerPage: React.FunctionComponent = () => {
  return (
    <div>
      <Course />
      <Host />
      <Image />
      <Kitchen />
      <Time />
    </div>
  );
};
export default DinnerPage;
