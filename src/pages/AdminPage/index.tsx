import { List, StylesProvider } from '@material-ui/core';
import React from 'react';
import { useGetAllUsersFromAPI } from '../../actions/apiCalls';
import UserListElement from '../../components/UserListElement';
import { User } from '../../util/types';
import styles from './styles.module.css';

const AdminPage: React.FunctionComponent = () => {
  const userList = useGetAllUsersFromAPI();
  // userList = userList.map((item)=>{})

  return (
    <div className={styles.overviewDiv}>
      .
      <div className={styles.overviewContent}>
        <StylesProvider injectFirst>
          <List className={styles.userList}>
            {(() => {
              const content: JSX.Element[] = [];
              if (userList != undefined) {
                userList.forEach((user: User) => {
                  content.push(<UserListElement user={user} key={user.id} />);
                });
              }
              return content;
            })()}
          </List>
        </StylesProvider>
      </div>
    </div>
  );
};
export default AdminPage;
