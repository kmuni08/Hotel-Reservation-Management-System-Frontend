import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MIN} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from "../../shared/components/UIElements/Card";
import './HotelForm.css';

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
        description: 'Airport hotel with a pool and free shuttle. Free Wi-Fi',
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
            price: 250,
            deluxe_user_pick: 0
        },
        standard: {
            numOfRooms: 40,
            price: 75,
            standard_user_pick: 0
        },
        suites: {
            numOfRooms: 10,
            price: 120,
            suites_user_pick: 0
        }
    }

];

const HotelInfo = () => {
    const hotelId = useParams().hotelId;
    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        deluxe_user_pick: {
            value: '',
            isValid: false
        },
        standard_user_pick: {
            value: '',
            isValid: false
        },
        suites_user_pick: {
            value: '',
            isValid: false
        }
    }, false);

    const identifiedHotel = HOTELS.find(h => h.id === hotelId);

    useEffect(() => {
        if(identifiedHotel) {
            setFormData({
                name: {
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
                },
                deluxe_user_pick: {
                    value: identifiedHotel.deluxe.deluxe_user_pick,
                    isValid: true
                },
                standard_user_pick: {
                    value: identifiedHotel.standard.standard_user_pick,
                    isValid: true
                },
                suites_user_pick: {
                    value: identifiedHotel.suites.suites_user_pick,
                    isValid: true
                }

            }, true);
        }
    }, [setFormData, identifiedHotel]);



    const hotelUpdateSubmitHandler = event => {
        event.preventDefault();
        if(formState.inputs.deluxe_user_pick.value == 0 && formState.inputs.suites_user_pick.value == 0 && formState.inputs.standard_user_pick.value == 0) {
            console.log('hello')
            alert('You cannot have all the rooms as 0')
        }
        // console.log(formState.inputs);
        console.log(formState.inputs.deluxe_user_pick.value);
        console.log(formState.inputs.suites_user_pick.value);
        console.log(formState.inputs.standard_user_pick.value);
    };

    if(!identifiedHotel) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find hotel!</h2>
                </Card>
            </div>
        );
    }


    return (
        <form className="hotel-form" onSubmit={hotelUpdateSubmitHandler}>

            <h4> Name of the Hotel: {identifiedHotel.name} </h4>
            <h4> Address: {identifiedHotel.address} </h4>
            <h4> Rating: {identifiedHotel.rating} </h4>
            <h4> {identifiedHotel.description} </h4>
            <h4> Deluxe Rooms Available: {identifiedHotel.deluxe.numOfRooms} rooms, Price: ${identifiedHotel.deluxe.price} per night</h4>
            <h4> Suites Rooms Available: {identifiedHotel.suites.numOfRooms} rooms, Price: ${identifiedHotel.deluxe.price} per night</h4>
            <h4> Standard Rooms Available: {identifiedHotel.standard.numOfRooms} rooms, Price: ${identifiedHotel.standard.price} per night</h4>
            <Input
                id = "deluxe_user_pick"
                element= "input"
                type = "number"
                label = "Deluxe"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                errorText="Please enter a valid number of deluxe rooms."
                onInput = {inputHandler}
                value = {identifiedHotel.deluxe.deluxe_user_pick}
                valid = {true}
            />
            <Input
                id = "suites_user_pick"
                element= "input"
                type = "number"
                label = "Suites"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                errorText="Please enter a valid number of suite rooms."
                onInput = {inputHandler}
                value = {identifiedHotel.suites.suites_user_pick}
                valid = {true}
            />
            <Input
                id = "standard_user_pick"
                element= "input"
                type = "number"
                label = "Standard"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                errorText="Please enter a valid number of standard rooms."
                onInput = {inputHandler}
                value = {identifiedHotel.standard.standard_user_pick}
                valid = {true}

            />
            <Button type="submit" disabled={!formState.isValid} >
                REGISTER FOR HOTEL
            </Button>

        </form>
    );

};

export default HotelInfo;