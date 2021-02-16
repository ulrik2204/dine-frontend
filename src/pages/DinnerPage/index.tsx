import React from 'react';
import Course from '../../components/DinnerInfo/Course/Course';
import Host from '../../components/DinnerInfo/Host/Host';
import Image from '../../components/DinnerInfo/Image/Image';
import Kitchen from '../../components/DinnerInfo/Kitchen/Kitchen';
import Time from '../../components/DinnerInfo/Time/Time';
import './DinnerPage.css';
import '../../fonts/Roboto-Thin.ttf';

const DinnerPage: React.FunctionComponent = () => {
  return (
    <div className="dinnerPageContainer">
      <Course />
      <Image />
      <div className="dinnerPageInfo">
        <Host />
        <Kitchen />
        <Time />
      </div>

      <div className="buttonContainer">
        <button id="signUp" type="submit">
          Meld på
        </button>
      </div>
    </div>
  );
};
export default DinnerPage;
