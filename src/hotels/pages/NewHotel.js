import React, { useContext } from 'react';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import './HotelForm.css';
import {VALIDATOR_MIN, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";

const NewHotel = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
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
        },
        deluxeNumOfRooms: {
            value: '',
            isValid: false
        },
        deluxePrice: {
            value: '',
            isValid: false
        },
        standardNumOfRooms: {
            value: '',
            isValid: false
        },
        standardPrice: {
            value: '',
            isValid: false
        },
        suitesNumOfRooms: {
            value: '',
            isValid: false
        },
        suitesPrice: {
            value: '',
            isValid: false
        }

    }, false);

    const history = useHistory();

    //want to send this to the backend.
    const hotelSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/hotels',
                'POST',
                JSON.stringify(
                {
                    image: formState.inputs.image.value,
                    name: formState.inputs.name.value,
                    address: formState.inputs.address.value,
                    description: formState.inputs.description.value,
                    deluxeNumOfRooms: formState.inputs.deluxeNumOfRooms.value,
                    deluxePrice: formState.inputs.deluxePrice.value,
                    standardNumOfRooms: formState.inputs.standardNumOfRooms.value,
                    standardPrice: formState.inputs.standardPrice.value,
                    suitesNumOfRooms: formState.inputs.suitesNumOfRooms.value,
                    suitesPrice: formState.inputs.suitesPrice.value
                }),
                { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token }
            );
            //Redirect user to different page.
            history.push('/' + auth.userId + '/hotels')
        } catch (err) {}

    }

    return (
        <React.Fragment>
            <ErrorModal error = {error} onClear = {clearError} />
            <form className = "hotel-form" onSubmit={hotelSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
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
                    id = "deluxeNumOfRooms"
                    element= "input"
                    type = "number"
                    label = "Deluxe Rooms Available"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(5)]}
                    errorText="Please enter a valid number of rooms."
                    onInput = {inputHandler}
                />
                <Input
                    id = "deluxePrice"
                    element= "input"
                    type = "number"
                    label = "Deluxe Price Per Night"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(50)]}
                    errorText="Please enter a valid number for price."
                    onInput = {inputHandler}
                />
                <Input
                    id = "standardNumOfRooms"
                    element= "input"
                    type = "number"
                    label = "Standard Rooms Available"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(5)]}
                    errorText="Please enter a valid number of rooms."
                    onInput = {inputHandler}
                />
                <Input
                    id = "standardPrice"
                    element= "input"
                    type = "number"
                    label = "Standard Room Price Per Night"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(50)]}
                    errorText="Please enter a valid number for price."
                    onInput = {inputHandler}
                />
                <Input
                    id = "suitesNumOfRooms"
                    element= "input"
                    type = "number"
                    label = "Suite Rooms Available"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(5)]}
                    errorText="Please enter a valid number of rooms."
                    onInput = {inputHandler}
                />
                <Input
                    id = "suitesPrice"
                    element= "input"
                    type = "number"
                    label = "Suite Price Per Night"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(50)]}
                    errorText="Please enter a valid number for price."
                    onInput = {inputHandler}
                />

                <Button type="submit" disabled={!formState.isValid}>
                    ADD HOTEL
                </Button>
            </form>
        </React.Fragment>

    )
};

export default NewHotel;