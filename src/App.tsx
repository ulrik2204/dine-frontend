import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Overview from './pages/Overview';
import React, { useEffect, useMemo, useState } from 'react';
import Menu from './components/Menu';
import DinnerPage from './pages/DinnerPage';
import CreateDinnerPage from './pages/CreateDinnerPage';
import UserContext from './util/UserContext';
import LogInPage from './pages/LogIn';
import RegInPage from './pages/RegIn';
import ProfilePage from './pages/ProfilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FunctionComponent = () => {
  // Intermediate values to set the startValueToken: Tries to find it locally first
  // These are values not rendreed on the screen, thus they do not need to be in a hook
  const localToken = localStorage.getItem('userToken');
  const startValueToken = localToken == null ? '' : localToken;
  // The userToken and its startValue, in addtion to the function to set the token
  const [userToken, setUserToken] = useState<string>(startValueToken);
  const providerValue = useMemo(() => ({ userToken, setUserToken }), [userToken, setUserToken]);

  // Update the localStorage token when the token changes, this way you are kept logged in on refresh
  useEffect(() => {
    localStorage.setItem('userToken', userToken);
  }, [userToken, setUserToken]);

  return (
    <Router>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          newestOnTop
          limit={3}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
        <UserContext.Provider value={providerValue}>
          <Menu />
          <Switch>
            <Route exact path="/" component={Overview} />
            <Route path="/dinner/:dinnerID" render={(props) => <DinnerPage dinnerID={props.match.params.dinnerID} />} />
            <Route path="/createdinnerevent" component={CreateDinnerPage} />
            <Route exact path="/login" component={LogInPage} />
            <Route exact path="/regin" component={RegInPage} />
            <Route exact path="/profile" component={ProfilePage} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
