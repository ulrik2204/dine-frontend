import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Menu from './components/Menu';
import AdminPage from './pages/AdminPage';
import CreateDinnerPage from './pages/CreateDinnerPage';
import DinnerPage from './pages/DinnerPage';
import EditDinnerPage from './pages/EditDinnerPage';
import LogInPage from './pages/LogIn';
import Overview from './pages/Overview';
import ProfilePage from './pages/ProfilePage';
import RegInPage from './pages/RegIn';
import UserContext from './util/UserContext';

const App: React.FunctionComponent = () => {
  // Intermediate values to set the startValueToken: Tries to find it locally first
  // These are values not rendreed on the screen, thus they do not need to be in a hook
  const startValueToken = useMemo(() => {
    const localToken = localStorage.getItem('userToken');
    return localToken == null || ['null', undefined, 'undefined'].indexOf(localToken) > -1 ? '' : localToken;
  }, [localStorage.getItem('userToken')]);
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
            <Route
              exact
              path="/dinner/:dinnerID"
              render={(props) => <DinnerPage dinnerID={props.match.params.dinnerID} />}
            />
            <Route exact path="/createdinnerevent" component={CreateDinnerPage} />
            <Route exact path="/login" component={LogInPage} />
            <Route exact path="/regin" component={RegInPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route
              exact
              path="/dinner/:dinnerID/edit"
              render={(props) => <EditDinnerPage dinnerID={props.match.params.dinnerID} />}
            />
            <Route exact path="/admin" component={AdminPage} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
