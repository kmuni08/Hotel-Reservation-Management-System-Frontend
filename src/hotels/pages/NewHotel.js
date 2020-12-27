import React from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import './HotelForm.css';
import {VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const NewHotel = () => {
    const [formState, inputHandler] = useForm({
        image: {
            value: '',
            isValid: false
        },
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
                id = "image"
                element= "input"
                type = "text"
                label = "Image"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid url"
                onInput = {inputHandler}
            />
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
            <Input
                id = "deluxeRooms"
                element= "input"
                type = "text"
                label = "Deluxe Rooms Available"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(5)]}
                errorText="Please enter a valid number of rooms."
                onInput = {inputHandler}
            />
            <Input
                id = "deluxePrice"
                element= "input"
                type = "text"
                label = "Deluxe Price Per Night"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(50)]}
                errorText="Please enter a valid number for price."
                onInput = {inputHandler}
            />
            <Input
                id = "standardRooms"
                element= "input"
                type = "text"
                label = "Standard Rooms Available"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(5)]}
                errorText="Please enter a valid number of rooms."
                onInput = {inputHandler}
            />
            <Input
                id = "standardPrice"
                element= "input"
                type = "text"
                label = "Standard Room Price Per Night"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(50)]}
                errorText="Please enter a valid number for price."
                onInput = {inputHandler}
            />
            <Input
                id = "suiteRooms"
                element= "input"
                type = "text"
                label = "Suite Rooms Available"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(5)]}
                errorText="Please enter a valid number of rooms."
                onInput = {inputHandler}
            />
            <Input
                id = "suitePrice"
                element= "input"
                type = "text"
                label = "Suite Price Per Night"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(50)]}
                errorText="Please enter a valid number for price."
                onInput = {inputHandler}
            />

            <Button type="submit" disabled={!formState.isValid}>
                ADD HOTEL
            </Button>
        </form>
    )
};

export default NewHotel;