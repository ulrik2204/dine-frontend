import { Button, TextField } from '@material-ui/core';
import { useCallback } from 'react';
import { useState } from 'react';
import styles from './styles.module.css';


const LogInPage: React.FunctionComponent = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const sendLogIn = useCallback((userName: string, password: string) => {
         // Check if the input is correct
        if (userName === '' || password === ''){
        alert('Du må skrive inn i begge feltene');
        return;
        }
      // Not checking date, as a datefield is used to secure this.
      // If a request with a bad date is sent directly to the backend,
      //the backend will handle that
  
      // The sent dinner event
    //   const dinner: Dinner = {
    //     dish: dish,
    //     cuisine: cuisine,
    //     date: date,
    //     location: location,
    //     owner: owner,
    //   };
    //   postDinner(dinner);
    }, []);

    return(
        <div className={styles.logInPage}>
            <h1>Hei</h1>
            <TextField
            className={styles.userName}
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            >Brukernavn</TextField>
            <TextField
            className={styles.password}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            >Passord</TextField>
            <Button className={styles.logInButton} onClick={() => sendLogIn(userName, password)}>Logg inn</Button>
        </div>
    )
}
export default LogInPage;