import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Overview from './pages/Overview';
import React from 'react';
import Menu from './components/Menu';
import DinnerPage from './pages/DinnerPage';
import CreateDinnerPage from './pages/CreateDinnerPage';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={Overview} />
          <Route exact path="/dinner" component={DinnerPage} />
          <Route exact path="/createdinnerevent" component={CreateDinnerPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
