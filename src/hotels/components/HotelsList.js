import React from 'react';

import HotelItem from './HotelItem';
import Card from '../../shared/components/UIElements/Card';
import './HotelsList.css';
import Button from "../../shared/components/FormElements/Button";


const HotelList = props => {
    if (props.hotels.length === 0) {
        return (
            <div className = "hotel-list center">
                <Card>
                    <h2>No Hotels found. Maybe Create One?</h2>
                    <Button to="/hotels/new">Create Hotel</Button>
                </Card>

            </div>
        );
    }

    return <ul className = "hotels-list">
        {props.hotels.map(hotel => (
            <HotelItem
                key={hotel.id}
                id = {hotel.id}
                image= {hotel.image}
                name = {hotel.name}
                address = {hotel.address}
                description= {hotel.description}
                creatorId = {hotel.creator}
                coordinates={hotel.location}
                onDelete = {props.onDeleteHotel}
            />
        ))}
    </ul>;
};

export default HotelList;