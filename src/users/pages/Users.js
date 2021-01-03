import React, {useContext, useEffect, useState} from 'react';

import UserList from '../components/UserList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {useParams} from "react-router-dom";
import { AuthContext } from '../../shared/context/auth-context';

const Users = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    const auth = useContext(AuthContext);
    const creatorId = auth.userId;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + `/reservations/${creatorId}`
                );

                setLoadedUsers(responseData.finalUsers );
            } catch (err) {}
        };
        fetchUsers();
    }, [sendRequest, creatorId]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
        </React.Fragment>
    );
};

export default Users;