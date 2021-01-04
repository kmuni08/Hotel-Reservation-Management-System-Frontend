import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './UserItems.css';


const UserItems = props => {
    // console.log(props.email);
    // console.log(props.reservations);
    return (
        <React.Fragment>
            <li className="user-item">
                <Card className="user-item__content">
                    <div className ="user-item__info">
                        <h3> Name: {props.name}</h3>
                        <h3> Email Address: {props.email} </h3>
                        <h3> Hotel Name: {props.hotelName} </h3>
                        <h3> Hotel Address: {props.hotelAddress} </h3>
                    </div>
                    {/*<div className = "user-item__actions">*/}
                    {/*    <Button to={`/hotels/uid/${props.id}`} >REGISTRATION DETAILS</Button>*/}
                    {/*</div>*/}
                </Card>
            </li>
        </React.Fragment>
    )
};

// <h3> Hotel Description: {props.hotelDescription} </h3>
// <h3> Dates Reserved: {props.startDateMonth}/{props.startDateNum}/{props.startDateYear} - {props.endDateMonth}/{props.endDateNum}/{props.endDateYear}</h3>
// <h3> Deluxe Rooms Reserved: {props.deluxe_user_pick}, Deluxe Price: {props.deluxePrice} </h3>
// <h3> Standard Rooms Reserved: {props.standard_user_pick}, Standard Price: {props.standardPrice}</h3>
// <h3> Suites Reserved: {props.suites_user_pick}, Suites Price: {props.suitesPrice} </h3>
// <h3> Total Payment Price: {props.totalPayment} </h3>
export default UserItems;