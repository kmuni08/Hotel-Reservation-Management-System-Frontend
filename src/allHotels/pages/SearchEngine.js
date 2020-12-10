import React from 'react';
import AllHotels from './AllHotels';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import './HotelForm.css';

const SearchEngine = () => {
    const [formState, inputHandler] = useForm({
        name: {
            value: '',
            isValid: false
        }
    }, false);

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
                    label = "Which hotel would you like to stay at today? "
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(0)]}
                    errorText="Please enter the name of the hotel"
                    onInput = {inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    SEARCH
                </Button>
            </form>
            <AllHotels />
        </React.Fragment>


    );
};

export default SearchEngine;