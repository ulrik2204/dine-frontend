import React, { useState, useEffect } from 'react';
import './DinnerPage.css';
import '../../fonts/Roboto-Thin.ttf';

const DinnerPage: React.FunctionComponent = () => {
  const [course, setCourse] = useState('Fransk');
  const [host, setHost] = useState('midlertidig');

  const [dateTime, setDateTime] = useState('Fredag 22.feb');
  const kitchen = useState('Italiensk');

  useEffect(() => {
    setCourse('Hei');
    setHost('Hei');
    setDateTime('Hei');
  }, [setCourse, setHost, setDateTime]);

  return (
    <div className="dinnerPageContainer">
      <h1 className="courseHeadline">{course}</h1>
      <img
        src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        alt="Matbilde"
      />
      <h1>Vert</h1>
      <h3>{host}</h3>
      <br />

      <div className="dinnerTimeDate">
        <h1>Tidspunkt</h1>
        <h3>{dateTime}</h3>

        <h1>Kjøkken</h1>
        <h3>{kitchen}</h3>
      </div>
      <button id="signUp" type="submit">
        Meld på
      </button>
    </div>
  );
};
export default DinnerPage;
