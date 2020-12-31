import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './UserItems.css';


const UserItems = props => {

    return (
        <React.Fragment>

            <li className="user-item">
                <Card className="user-item__content">
                    <div className ="user-item__info">
                        <h3> Name: {props.name}</h3>
                        <h3> Email Address: {props.email} </h3>
                    </div>
                    <div className = "user-item__actions">
                        <Button to={`/allhotels/${props.id}`} >REGISTRATION DETAILS</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>

    )
};

export default UserItems;