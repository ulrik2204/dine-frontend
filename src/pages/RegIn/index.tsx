import { Button, TextField } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRegisterUser } from '../../actions/apiCalls';
import useDidMountEffect from '../../actions/useDidMountEffect';
import AllergyMultiselect from '../../components/AllergyMultiselect';
import { defaultRegistrationUser } from '../../util/constants';
import { RegistrationUser } from '../../util/types';
import styles from './styles.module.css';

const RegInPage: React.FunctionComponent = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [allergies, setAllergies] = useState<number[]>([]);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [registerUser, setRegisterUser] = useState(defaultRegistrationUser);
  const { status, resetStatus } = useRegisterUser(registerUser);
  const history = useHistory();

  const sendRegIn = useCallback(() => {
    // Check if the input is correct
    if ([username, last_name, last_name, address, password, password2].indexOf('') > -1) {
      toast.warn('Du må skrive inn i alle feltene');
      return;
    }

    if (password != password2) {
      toast.warn('Passordene er ikke like');
      return;
    }
    const RegisterUserInput: RegistrationUser = {
      username,
      first_name,
      last_name,
      address,
      allergies,
      password,
      password2,
    };
    setRegisterUser(RegisterUserInput);
  }, [setRegisterUser, username, first_name, last_name, address, allergies, password, password2]);

  useDidMountEffect(() => {
    console.log(status);
    if (status === 400) {
      toast.error('Registering mislykkes!');
      resetStatus();
    } else if (status === 200) {
      toast.info('Brukeren ble opprettet!');
      history.push('/');
    }
  }, [status]);

  return (
    <StylesProvider injectFirst>
      <div className={styles.regInPage}>
        <h1>Register deg</h1>
        <h2 className={styles.inputText}>Brukernavn</h2>
        <TextField
          className={styles.input}
          value={username}
          onChange={(event) => setUserName(event.target.value)}
        ></TextField>
        <h2 className={styles.inputText}>Fornavn</h2>
        <TextField
          className={styles.input}
          value={first_name}
          onChange={(event) => setFirstName(event.target.value)}
        ></TextField>
        <h2 className={styles.inputText}>Etternavn</h2>
        <TextField
          className={styles.input}
          value={last_name}
          onChange={(event) => setLastName(event.target.value)}
        ></TextField>

        <h2 className={styles.inputText}>Adresse</h2>
        <TextField
          className={styles.input}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        ></TextField>
        <h2 className={styles.inputText}>Allergier</h2>
        <AllergyMultiselect allergyIDs={allergies} setAllergyIDs={setAllergies} className={styles.inputText} />
        <h2 className={styles.inputText}>Passord</h2>
        <TextField
          className={styles.input}
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        ></TextField>
        <h2 className={styles.inputText}>Gjenta passord</h2>
        <TextField
          className={styles.input}
          value={password2}
          type="password"
          onChange={(event) => setPassword2(event.target.value)}
        ></TextField>

        <Button className={styles.regInButton} onClick={() => sendRegIn()}>
          Registrer
        </Button>
      </div>
    </StylesProvider>
  );
};
export default RegInPage;
