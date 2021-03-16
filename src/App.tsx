import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Overview from './pages/Overview';
import React, { useMemo, useState } from 'react';
import Menu from './components/Menu';
import DinnerPage from './pages/DinnerPage';
import CreateDinnerPage from './pages/CreateDinnerPage';
import UserContext from './util/UserContext';
import LogInPage from './pages/LogIn';
import RegInPage from './pages/RegIn';

const App: React.FunctionComponent = () => {
  const [userToken, setUserToken] = useState<string>('');
  const providerValue = useMemo(() => ({ userToken, setUserToken }), [userToken, setUserToken]);

  return (
    <Router>
      <div>
        <UserContext.Provider value={providerValue}>
          <Menu />
          <Switch>
            <Route exact path="/" component={Overview} />
            <Route path="/dinner/:dinnerID" render={(props) => <DinnerPage dinnerID={props.match.params.dinnerID} />} />
            <Route path="/createdinnerevent" component={CreateDinnerPage} />
            <Route exact path="/login" component={LogInPage} />
            <Route exact path="/regin" component={RegInPage} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
