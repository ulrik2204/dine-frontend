import { Button, TextField } from '@material-ui/core';
import React, { useCallback } from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useState } from 'react';
import styles from './styles.module.css';
import { StylesProvider } from '@material-ui/core/styles';
import { useGetAllergyFromAPI, useGetUserFromAPI } from '../../actions/apiCalls';
import UserContext from '../../util/UserContext';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

type ProfilePageProps = {
    userID: number;
  };


const ProfilePage: React.FunctionComponent<ProfilePageProps> = (props:ProfilePageProps) => {
    const user = useGetUserFromAPI(props.userID);
    const [allergyId, setAllergyId] = useState(0);
    const allergy = useGetAllergyFromAPI(allergyId);
    const {setUserToken} = useContext(UserContext);
    const history = useHistory();

    return (
        <StylesProvider injectFirst>
        <div className={styles.profilePage}>
            <h1>Min profil</h1>
            <h2 className={styles.inputText}>Navn</h2>
            <h3 className={styles.input}>{user.first_name} {user.last_name}</h3>
            <h2 className={styles.inputText}>Brukernavn</h2>
            <h3 className={styles.input}>{user.username}</h3>
            <h2 className={styles.inputText}>Adresse</h2>
            <h3 className={styles.input}>{user.address}</h3>
            <h2 className={styles.inputText}>Allergier</h2>
            <h3 className={styles.input}>{() => {
                if (user.allergies != undefined){
                    return user.allergies.map((aId) => {
                        setAllergyId(aId)
                        return allergy.allergy;
                    }).join(", ");
                }
                
                
            }}</h3>
          
            <Button className={styles.changeButton} onClick={() => {
                setUserToken("");
                history.push('/');
            }}>
                Logg ut
            </Button>
        </div>
        </StylesProvider>
    );
    };
export default ProfilePage;
