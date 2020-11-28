import React from 'react';
import HotelsList from '../components/HotelsList';
import { useParams } from 'react-router-dom';

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

const NewHotel = () => {
    //returns an object which has dynamic segments as properties.
    const userId = useParams().userId;
    const loadedHotels = HOTELS.filter(hotel => hotel.creator === userId);
    return <HotelsList hotels = {loadedHotels} />;
};

export default NewHotel;