import React from 'react';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import './HotelItem.css';

const HotelItem = props => {
    return (
        <li className="hotel-item">
            <Card className="hotel-item__content">
                <div className ="hotel-item__image">
                    <Avatar image = {props.image} alt ={props.name } />
                </div>
                <div className ="hotel-item__info">
                    <h2> {props.name}</h2>
                    <h3> {props.address} </h3>
                    <h3> {props.rating} stars rating</h3>
                    <h3> {props.description}</h3>
                    {/*<h3> {props.creatorId}</h3>*/}
                    {/*<h3> {props.coordinates}</h3>*/}
                    {/*<h3> {props.numOfDeluxe}</h3>*/}
                    {/*<h3> {props.priceOfDeluxe}</h3>*/}
                    {/*<h3> {props.numOfStandard}</h3>*/}
                    {/*<h3> {props.priceOfDeluxe}</h3>*/}
                    {/*<h3> {props.numOfSuites}</h3>*/}
                    {/*<h3> {props.priceOfDeluxe}</h3>*/}
                </div>
                <div className = "hotel_item__actions">
                    <Button inverse>VIEW ON MAP</Button>
                    <Button to={`/hotels/${props.id}`} >EDIT</Button>
                    <Button danger>DELETE</Button>
                </div>
            </Card>
        </li>
    )
};

export default HotelItem;