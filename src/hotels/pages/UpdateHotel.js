import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from "../../shared/util/validators";
import './HotelForm.css';
import { useForm } from "../../shared/hooks/form-hook";

const HOTELS = [
    {
        id: '1',
        image: 'https://content.fortune.com/wp-content/uploads/2020/05/F500-2020-338-Hilton-.jpg',
        name: 'Hilton',
        rating: 4.0,
        address: '42 Street, Midtown NYC',
        creator: 'u1',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        description: 'Aiport hotel with a pool and free shuttle. Free Wi-Fi',
        deluxe: {
            numOfRooms: 25,
            price: 300
        },
        standard: {
            numOfRooms: 50,
            price: 85
        },
        suites: {
            numOfRooms: 15,
            price: 150
        }
    },
    {
        id: '2',
        image: 'https://www.gannett-cdn.com/presto/2019/04/16/USAT/15d11370-b0e6-4743-adf0-387d1fa95ab5-AP_Marriott_Starwood_Sale.JPG?crop=4851,2740,x0,y0&width=3200&height=1808&format=pjpg&auto=webp',
        name: 'Marriot',
        rating: 3.8,
        address: '1 Union Turnpike, Queens',
        creator: 'u2',
        location: {
            lat: 30.7484405,
            lng: -83.9878584
        },
        description: 'Free breakfast and Wi-Fi. It is near airport for easy access. ',
        deluxe: {
            numOfRooms: 15,
            price: 250
        },
        standard: {
            numOfRooms: 40,
            price: 75
        },
        suites: {
            numOfRooms: 10,
            price: 120
        }
    }

];

const UpdateHotel = () => {
    const hotelId = useParams().hotelId;
    const identifiedHotel = HOTELS.find(h => h.id === hotelId);

    const [formState, inputHandler] = useForm({
        title: {
            value: identifiedHotel.name,
            isValid: true
        },
        address: {
            value: identifiedHotel.address,
            isValid: true
        },
        description: {
            value: identifiedHotel.description,
            isValid: true
        }
    }, true)

    const hotelUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    if(!identifiedHotel) {
        return (
            <div className="center">
                <h2>Could not find hotel!</h2>
            </div>
        );
    }
    return (
        <form className="hotel-form" onSubmit={hotelUpdateSubmitHandler}>
            <Input
                id="name"
                element="input"
                type="text"
                label="Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText = "Please enter a valid name"
                onInput = {inputHandler}
                value = {identifiedHotel.name}
                valid = {true}
            />
            <Input
                id="address"
                element="input"
                type="text"
                label="Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText = "Please enter a valid address"
                onInput = {inputHandler}
                value = {identifiedHotel.address}
                valid = {true}
            />

            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText = "Please enter a valid description (min. 5 characters)"
                onInput = {inputHandler}
                value = {identifiedHotel.description}
                valid = {true}
            />
            <Button type="submit" disabled={!formState.isValid} >
                UPDATE HOTEL
            </Button>

        </form>
    );

};

export default UpdateHotel;