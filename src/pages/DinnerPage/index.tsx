import React from 'react';
import './DinnerPage.css';
import '../../fonts/Roboto-Thin.ttf';

/**
 * Component for dinner page.
 */
const DinnerPage: React.FunctionComponent = () => {
  const dinner = { course: 'Taco', host: 'Simen', dateTime: 'now', kitchen: 'Meksikansk' };

  return (
    <div className="dinnerPageContainer">
      <h1 id="dinnerPageHeadline">{dinner.course}</h1>
      <img
        id="dinnerPageImage"
        src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        alt="Matbilde"
      />
      <h1 className="dinnerPageH1">Vert</h1>
      <h3 className="dinnerPageH3">{dinner.host}</h3>

      <h1 className="dinnerPageH1">Kjøkken</h1>
      <h3 className="dinnerPageH3">{dinner.kitchen}</h3>

      <h1 className="dinnerPageH1">Tidspunkt</h1>
      <h3 className="dinnerPageH3">{dinner.dateTime}</h3>

      <button id="signUp" type="submit">
        Meld på
      </button>
    </div>
  );
};
export default DinnerPage;
