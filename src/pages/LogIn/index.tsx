import { Button, TextField } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLoginUser } from '../../actions/apiCalls';
import useDidMountEffect from '../../actions/useDidMountEffect';
import { defaultLoginUser } from '../../util/constants';
import { LoginUser } from '../../util/types';
import styles from './styles.module.css';

const LogInPage: React.FunctionComponent = () => {
  const history = useHistory();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, setLoginUser] = useState(defaultLoginUser);
  const { status, resetStatus } = useLoginUser(loginUser);

  const sendLogIn = useCallback((username: string, password: string) => {
    // Check if the input is correct
    if (username === '' || password === '') {
      toast.warn('Du må skrive inn i begge feltene');
      return;
    }
    console.log(username);
    const loginUserInput: LoginUser = { username, password };
    setLoginUser(loginUserInput);
  }, []);

  useDidMountEffect(() => {
    if (status === 400) {
      toast.warn('Ukjent brukernavn / passord');
      resetStatus();
    }
    if (status === 200) {
      toast.info('Du er logget inn!');
      history.push('/');
    }
  }, [status]);

  return (
    <div className={styles.logInPage}>
        <h1>Logg inn</h1>
        <h2 className={styles.inputText}>Brukernavn</h2>
        <TextField
          className={styles.input}
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        ></TextField>
        <h2 className={styles.inputText}>Passord</h2>
        <TextField
          className={styles.input}
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        ></TextField>
        <p className={styles.link} onClick={() => history.push('/regin')}>
          Har du ikke bruker? Registrer deg her
        </p>
      <StylesProvider injectFirst>
        <Button className={styles.logInButton} onClick={() => sendLogIn(username, password)}>
          Logg inn
        </Button>
      </StylesProvider>
    </div>
  );
};
export default LogInPage;
