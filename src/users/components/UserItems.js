import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './UserItems.css';


const UserItems = props => {
    return (
        <React.Fragment>
            <li className="user-item">
                <Card className="user-item__content">
                    <div className ="user-item__info">
                        <h3> Name: {props.name}</h3>
                        <h3> Email Address: {props.email} </h3>
                        <h3> Hotel Name: {props.hotelName} </h3>
                        <h3> Hotel Address: {props.hotelAddress} </h3>
                        <h3> Hotel Description: {props.hotelDescription} </h3>
                        {/*<h3> Dates Reserved: {props.hotelStartDateMonth}/{props.hotelStartDateNum}/{props.hotelStartDateYear} - {props.hotelEndDateMonth}/{props.hotelEndDateNum}/{props.hotelEndDateYear}</h3>*/}
                    </div>

                </Card>
            </li>
        </React.Fragment>
    )
};

export default UserItems;