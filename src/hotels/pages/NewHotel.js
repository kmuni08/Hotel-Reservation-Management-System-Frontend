import React from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import './HotelForm.css';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const NewHotel = () => {
    const [formState, inputHandler] = useForm({
        name: {
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

    //want to send this to the backend.
    const hotelSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return (
        <form className = "hotel-form" onSubmit={hotelSubmitHandler}>
            <Input
                id = "name"
                element= "input"
                type = "text"
                label = "Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid name."
                onInput = {inputHandler}
            />
            <Input
                id = "address"
                element= "input"
                type = "text"
                label = "Address"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid address."
                onInput = {inputHandler}
            />
            <Input
                id = "description"
                element= "textarea"
                label = "Description"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)."
                onInput = {inputHandler}
            />

            <Button type="submit" disabled={!formState.isValid}>
                ADD HOTEL
            </Button>
        </form>
    )
};

export default NewHotel;