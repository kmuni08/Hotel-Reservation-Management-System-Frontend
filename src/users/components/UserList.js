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
                hotelName = {user.hotelName}
                hotelAddress = {user.hotelAddress}
                hotelDescription = {user.hotelDescription}
                hotelStartDateMonth = {user.hotelStartDateMonth}
                hotelStartDateNum = {user.hotelStartDateNum}
                hotelStartDateYear = {user.hotelStartDateYear}
                hotelEndDateMonth = {user.hotelEndDateMonth}
                hotelEndDateNum = {user.hotelEndDateNum}
                hotelEndDateYear = {user.hotelEndDateYear}
                hotelDeluxeRoomsPicked= {user.hotelDeluxeRoomsPicked}
                deluxePrice = {user.deluxePrice}
                hotelStandardRoomsPicked= {user.hotelStandardRoomsPicked}
                standardPrice = {user.standardPrice}
                hotelSuitesRoomsPicked = {user.hotelSuitesRoomsPicked}
                suitesPrice = {user.suitesPrice}
                totalPaymentForReserved = {user.totalPaymentForReserved }

            />
        ))}
    </ul>;
};

export default UserLists;