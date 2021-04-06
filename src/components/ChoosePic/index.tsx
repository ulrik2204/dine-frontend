import React from 'react';
import others from '../../assets/Andremat.jpg';
import french from '../../assets/Franskmat.jpg';
import indian from '../../assets/Indiskmat.jpg';
import italian from '../../assets/Italienskmat.jpg';
import japanese from '../../assets/Japanskmat.jpg';
import chinese from '../../assets/Kinesiskmat.jpg';
import mexican from '../../assets/Meksikanskmat.jpg';
import norwegian from '../../assets/Norskmat.jpg';
import spanish from '../../assets/Spanskmat.jpg';
import thai from '../../assets/Thaimat.jpg';
import turkish from '../../assets/Tyrkiskmat.jpg';

const supportedImages = {
  Andre: others,
  Fransk: french,
  Indisk: indian,
  Italiensk: italian,
  Japansk: japanese,
  Kinesisk: chinese,
  Norsk: norwegian,
  Spansk: spanish,
  Meksikansk: mexican,
  Thai: thai,
  Tyrkisk: turkish,
};

type ChoosePicProps = {
  cuisine: string;
  className?: string;
};

/**
 * Chack if the cuisine is supported
 * @param cuisine
 * @returns
 */
const isSupportedCuisine = (cuisine: string): cuisine is keyof typeof supportedImages => {
  const supportedCuisines = [
    'Fransk',
    'Italiensk',
    'Japansk',
    'Kinesisk',
    'Meksikansk',
    'Norsk',
    'Spansk',
    'Thai',
    'Tyrkisk',
  ];
  return supportedCuisines.indexOf(cuisine) > -1;
};

/**
 * The component that returns the correct picure from a cuisine
 * @param props The cuisine and an optionbal classnama
 * @returns The image to that cuisine with the className provided
 */
const ChoosePic: React.FunctionComponent<ChoosePicProps> = ({ cuisine, className }) => {
  return (() => {
    if (isSupportedCuisine(cuisine)) {
      const path = supportedImages[cuisine];
      return <img src={path} alt="Hei Bilde" className={className} />;
    }
    return <img src={supportedImages['Andre']} alt="Annet Bilde" className={className} />;
  })();
};

export default ChoosePic;
