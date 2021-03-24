import React, { useEffect } from 'react';
import '../../fonts/Roboto-Thin.ttf';
import styles from './styles.module.css';
import { useGetDinnerFromAPI } from '../../actions/apiCalls';
import { retrieveAllergies } from '../../actions/retrieve';

// All you need to see a dinner page is the dinnerID
type DinnerPageProps = {
  dinnerID: number;
};

/**
 * Component for dinner page.
 */
const DinnerPage: React.FunctionComponent<DinnerPageProps> = (props: DinnerPageProps) => {
  const dinner = useGetDinnerFromAPI(props.dinnerID);
  const allergies = retrieveAllergies(dinner.allergies as number[]);

  useEffect(() => {
    console.log(allergies.length == 0);
    console.log(dinner.description);
  }, []);

  return (
    <div className={styles.dinnerPageContainer}>
      <h1 className="title">{dinner?.dish}</h1>
      <img
        className={styles.dinnerPageImage}
        src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        alt="Matbilde"
      />
      <h1 className={styles.dinnerPageH1}>Vert</h1>
      <h3 className={styles.dinnerPageH3}>{dinner.owner}</h3>

      <h1 className={styles.dinnerPageH1}>Kjøkken</h1>
      <h3 className={styles.dinnerPageH3}>{dinner.cuisine}</h3>

      <h1 className={styles.dinnerPageH1}>Tidspunkt</h1>
      <h3 className={styles.dinnerPageH3}>{new Date(dinner?.date).toLocaleString()}</h3>

      <h1 className={styles.dinnerPageH1}>Sted</h1>
      <h3 className={styles.dinnerPageH3}>{dinner.location}</h3>

      <h1 className={styles.dinnerPageH1}>Allergier</h1>
      <h3 className={styles.dinnerPageH3}>{allergies.join(', ') || 'Ingen allergier'}</h3>

      <h1 className={styles.dinnerPageH1}>Beskrivelse</h1>
      <h3 className={styles.dinnerPageH3}>{dinner.description || 'Ingen beskrivelse'}</h3>
      {/* 
      <button className={classes.signUp}>
        Meld på
      </button> */}
    </div>
  );
};
export default DinnerPage;
