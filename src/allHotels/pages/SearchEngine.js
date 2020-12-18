import React from 'react';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import HotelLists from '../components/HotelLists';
import './HotelForm.css';

const SEARCH_HOTELS = [
    {
        id: '1',
        image: 'https://content.fortune.com/wp-content/uploads/2020/05/F500-2020-338-Hilton-.jpg',
        name: 'Hilton',
        rating: 4.0,
        address: '42 Street, Midtown NYC',
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

const SearchEngine = () => {
    const [formState, inputHandler] = useForm({
        name: {
            value: '',
            isValid: false
        }
    }, false);

    const [searchHotelName, setSearchHotelName] = React.useState("");
    const [searchHotelResults, setSearchHotelResults] = React.useState([]);

    React.useEffect(() => {
        const loadedHotels = SEARCH_HOTELS.filter(hotel =>
            hotel.name.toString().toLowerCase().includes(searchHotelName.toString().toLowerCase())
        );
        setSearchHotelResults(loadedHotels);
    }, [searchHotelName]);


    const hotelSearchSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    };

    return (
        <React.Fragment>
            <form className="search-hotel-form" onSubmit={hotelSearchSubmitHandler }>
                <Input
                    id = "name"
                    element= "input"
                    type = "text"
                    label = "Where would you like to make a reservation at today? "
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(0)]}
                    errorText="Please enter the name of the hotel"
                    onInput = {inputHandler}
                    value= {searchHotelName}
                    onChange = { e => setSearchHotelName(e.target.value)}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    SEARCH
                </Button>
            </form>
            <HotelLists hotels = {searchHotelResults} />;
        </React.Fragment>


    );
};

export default SearchEngine;