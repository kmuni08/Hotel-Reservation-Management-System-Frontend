import React from 'react';
import {Link} from "react-router-dom";

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './HotelItem.css';

const HotelItem = props => {
    return (
        <li className="hotel-item">
            <Card className="hotel-item__content">
                <Link to={`/${props.id}/hotels`}>
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
                    <button>VIEW ON MAP</button>
                    <br></br>
                    <button>EDIT</button>
                    <button>DELETE</button>
                </div>
                </Link>
            </Card>
        </li>
    )
};

export default HotelItem;