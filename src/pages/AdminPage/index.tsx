import { Button } from "@material-ui/core";
import React from "react";
import styles from './styles.module.css';
import { User } from '../../util/types';
import { List } from "@material-ui/core";
import UserListElement from '../../components/UserListElement';
import { useGetAllUsersFromAPI } from "../../actions/apiCalls";
import { StylesProvider } from "@material-ui/core";


const AdminPage: React.FunctionComponent = () => {
    const userList = useGetAllUsersFromAPI();
   // userList = userList.map((item)=>{})

    return(

        <StylesProvider injectFirst>
            <div className={styles.adminPageContainer}>
            
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
                <Button className ={styles.deleteButton}>
                    Slett
                </Button>
            </div>
        </StylesProvider>
    )
};
export default AdminPage;