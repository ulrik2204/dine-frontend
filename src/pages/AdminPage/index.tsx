import { List, StylesProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isUserAdmin, useGetAllUsersFromAPI, useGetHeaders } from '../../actions/apiCalls';
import UserListElement from '../../components/UserListElement';
import { isLoggedIn } from '../../util/checks';
import { User } from '../../util/types';
import styles from './styles.module.css';

const AdminPage: React.FunctionComponent = () => {
  const userList = useGetAllUsersFromAPI();
  const headers = useGetHeaders();
  const history = useHistory();
  const isLoggedInUser = isLoggedIn();
  // userList = userList.map((item)=>{})

  // When the page is rendered, check if the user has permission, and if not redirect to home
  useEffect(() => {
    isUserAdmin(headers)
      .then((res) => {
        if (!res) {
          toast.warning('Du har ikke tillatelse til dette');
          history.push('/');
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.warning('Du er ikke logget inn');
          history.push('/');
        } else {
          toast.warning('Noe galt skjedde');
          history.push('/');
        }
      });
  }, []);

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
