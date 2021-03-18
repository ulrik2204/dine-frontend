import { Button, TextField } from '@material-ui/core';
import React, { useCallback } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useState } from 'react';
import styles from './styles.module.css';
import { StylesProvider } from '@material-ui/core/styles';

const ProfilePage: React.FunctionComponent = () => {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [address, setAddress] = useState('');
    const [allergy, setAllergy] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const sendProfile = useCallback((name: string, userName: string, address: string, allergy: string, password: string, password2: string) => {
        // Check if the input is correct
        if (name === '' || userName === '' || address === '' || allergy === '' || password === '' || password2 === '') {
            alert('Du må skrive inn i alle feltene');
            return;

        }
    }, []);

    return (
        <StylesProvider injectFirst>
        <div className={styles.profilePage}>
            <h1>Min profil</h1>
            <h2 className={styles.inputText}>Navn</h2>
            <TextField className={styles.input} value={name} onChange={(event) => setName(event.target.value)}>
            </TextField>
            <h2 className={styles.inputText}>Epost</h2>
            <TextField className={styles.input} value={userName} onChange={(event) => setUserName(event.target.value)}>
            </TextField>
            <h2 className={styles.inputText}>Adresse</h2>
            <TextField className={styles.input} value={address} onChange={(event) => setAddress(event.target.value)}>
            </TextField>
            <h2 className={styles.inputText}>Allergier</h2>
            <NativeSelect className={styles.inputField} onChange={(e) => setAllergy(e.target.value)}>
                <option value={'Andre'}>Andre</option>
            </NativeSelect>
            <h2 className={styles.inputText}>Passord</h2>
            <TextField className={styles.input} value={password} type="password" onChange={(event) => setPassword(event.target.value)}>
            </TextField>
            <h2 className={styles.inputText}>Gjenta passord</h2>
            <TextField className={styles.input} value={password2} type="password" onChange={(event) => setPassword2(event.target.value)}>
            </TextField>
            <Button className={styles.changeButton} onClick={() => sendProfile(name, userName, address, allergy, password, password2)}>
                Lagre endringer
            </Button>
        </div>
        </StylesProvider>
    );
    };
export default ProfilePage;
