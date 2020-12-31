import React, { useEffect }  from 'react';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import HotelLists from '../components/HotelLists';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './HotelForm.css';

const SearchEngine = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm({
        name: {
            value: '',
            isValid: false
        }
    }, false);

    const [searchHotelName, setSearchHotelName] = React.useState("");
    const [searchHotelResults, setSearchHotelResults] = React.useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/hotels'
                );
                const loadedHotels = responseData.hotels.filter(hotel =>
                      hotel.name.toString().toLowerCase().includes(searchHotelName.toString().toLowerCase())
                );
                setSearchHotelResults(loadedHotels);
            } catch (err) {}
        };
        fetchHotels();
    }, [sendRequest, searchHotelName]);

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
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && searchHotelResults && <HotelLists hotels={searchHotelResults} />}
        </React.Fragment>


    );
};

export default SearchEngine;