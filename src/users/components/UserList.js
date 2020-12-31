import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './UserList.css';
import UserItems from "./UserItems";


const UserLists = props => {
    if (props.items.length === 0) {
        return (
            <div className = "user-list center">
                <Card>
                    <h2>No Users found at this time</h2>
                </Card>
            </div>
        );
    }

    return <ul className = "users-list">
        {props.items.map(user => (
            <UserItems
                key={user.id}
                id = {user.id}
                name = {user.name}
                email = {user.email}
            />
        ))}
    </ul>;
};

export default UserLists;