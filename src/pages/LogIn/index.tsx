import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import styles from './styles.module.css';
import { StylesProvider } from '@material-ui/core/styles';


const LogInPage: React.FunctionComponent = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const sendLogIn = useCallback((userName: string, password: string) => {
    // Check if the input is correct
    if (userName === '' || password === '') {
      alert('Du må skrive inn i begge feltene');
      return;
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <div className={styles.logInPage}>
        <h1>Logg inn</h1>
        <h2 className={styles.inputText}>Brukernavn</h2>
        <TextField className={styles.input} value={userName} onChange={(event) => setUserName(event.target.value)}>
        </TextField>
        <h2 className={styles.inputText}>Passord</h2>
        <TextField className={styles.input} value={password} type="password" onChange={(event) => setPassword(event.target.value)}>
        </TextField>
        <p className={styles.link}>Har du ikke bruker? Registrer deg her</p>
        <Button className={styles.logInButton} onClick={() => sendLogIn(userName, password)}>
          Logg inn
        </Button>
      </div>
    </StylesProvider>
  );
};
export default LogInPage;
