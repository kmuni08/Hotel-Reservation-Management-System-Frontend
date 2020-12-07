import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from "../../shared/util/validators";
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
        description: {
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
                }
            }, true);
        }
    }, [setFormData, identifiedHotel]);



    const hotelUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
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

            <h3> Name of the Hotel: {identifiedHotel.name} </h3>
            <h3> Address: {identifiedHotel.address} </h3>
            <h3> Rating: {identifiedHotel.rating} </h3>
            <h3> {identifiedHotel.description} </h3>
            <h3> Deluxes Available: {identifiedHotel.deluxe.numOfRooms} </h3>
            <h3> Deluxe Price: ${identifiedHotel.deluxe.price} </h3>
            <h3> Suites Available: {identifiedHotel.suites.numOfRooms} </h3>
            <h3> Suite Price: ${identifiedHotel.suites.price} </h3>
            <h3> Standard Rooms Available: {identifiedHotel.standard.numOfRooms} </h3>
            <h3> Standard Room Price: ${identifiedHotel.standard.price} </h3>



            <Button type="submit" disabled={!formState.isValid} >
                REGISTER FOR HOTEL
            </Button>

        </form>
    );

};

export default HotelInfo;