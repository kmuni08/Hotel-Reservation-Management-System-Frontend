import React from 'react';

import HotelItems from './HotelItems';
import Card from '../../shared/components/UIElements/Card';
import './HotelLists.css';


const HotelLists = props => {
    if (props.hotels.length === 0) {
        return (
            <div className = "hotel-list center">
                <Card>
                    <h2>No Hotels found at this time</h2>
                </Card>
            </div>
        );
    }

    return <ul className = "hotels-list">
        {props.hotels.map(hotel => (
            <HotelItems
                key={hotel.id}
                id = {hotel.id}
                image= {hotel.image}
                name = {hotel.name}
                address = {hotel.address}
                rating= {hotel.rating}
                description= {hotel.description}
                coordinates={hotel.location}
                // creatorId = {hotel.creator}
                // coordinates = {hotel.location}
                // numOfDeluxe={hotel.numOfDeluxe}
                // priceOfDeluxe={hotel.priceOfDeluxe}
                // numOfStandard={hotel.numOfStandard}
                // priceOfStandard={hotel.priceOfStandard}
                // numOfSuites={hotel.numOfSuites}
                // priceOfSuites={hotel.priceOfSuites}
            />
        ))}
    </ul>;
};

export default HotelLists;