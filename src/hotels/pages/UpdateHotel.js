import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MIN} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from "../../shared/components/UIElements/Card";
import './HotelForm.css';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const UpdateHotel = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedHotel, setLoadedHotel] = useState();
    const hotelId = useParams().hotelId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
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

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/hotels/${hotelId}`);
                setLoadedHotel(responseData.hotel);
                setFormData({
                    image: {
                        value: responseData.hotel.image,
                        isValid: true
                    },
                    name: {
                        value: responseData.hotel.name,
                        isValid: true
                    },
                    address: {
                        value: responseData.hotel.address,
                        isValid: true
                    },
                    description: {
                        value: responseData.hotel.description,
                        isValid: true
                    },
                    deluxeNumOfRooms: {
                        value: responseData.hotel.deluxeNumOfRooms,
                        isValid: true
                    },
                    deluxePrice: {
                        value: responseData.hotel.deluxePrice,
                        isValid: true
                    },
                    standardNumOfRooms: {
                        value: responseData.hotel.standardNumOfRooms,
                        isValid: true
                    },
                    standardPrice: {
                        value: responseData.hotel.standardPrice,
                        isValid: true
                    },
                    suitesNumOfRooms: {
                        value: responseData.hotel.suitesNumOfRooms,
                        isValid: true
                    },
                    suitesPrice: {
                        value: responseData.hotel.suitesPrice,
                        isValid: true
                    }
                }, true);
            } catch (err) {}
        };
        fetchHotel();
    }, [sendRequest, hotelId, setFormData]);

    const hotelUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/hotels/${hotelId}`,
                'PATCH',
                JSON.stringify({
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
                {
                    'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/' + auth.userId + '/hotels')
        } catch (err) {}

    };

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if(!loadedHotel && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find hotel!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error = {error} onClear = {clearError} />
            {!isLoading && loadedHotel && (
              <form className="hotel-form" onSubmit={hotelUpdateSubmitHandler}>
                <Input
                    id="image"
                    element="input"
                    type="text"
                    label="Image"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText = "Please enter a valid url"
                    onInput = {inputHandler}
                    value = {loadedHotel.image}
                    valid = {true}
                />
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText = "Please enter a valid name"
                    onInput = {inputHandler}
                    value = {loadedHotel.name}
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
                    value = {loadedHotel.address}
                    valid = {true}
                />
                <Input
                    id="description"
                    element="textarea"
                    type="text"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText = "Please enter a valid description (min. 5 characters)"
                    onInput = {inputHandler}
                    value = {loadedHotel.description}
                    valid = {true}
                />
                <Input
                    id="deluxeNumOfRooms"
                    element="input"
                    type="number"
                    label="Deluxe Rooms Available"
                    validators={[VALIDATOR_MIN(5)]}
                    errorText = "Please enter a valid number of deluxe rooms"
                    onInput = {inputHandler}
                    value = {loadedHotel.deluxeNumOfRooms}
                    valid = {true}
                />
                <Input
                    id="deluxePrice"
                    element="input"
                    type="number"
                    label="Deluxe Price per Night"
                    validators={[VALIDATOR_MIN(40)]}
                    errorText = "Please enter a valid price for deluxe rooms"
                    onInput = {inputHandler}
                    value = {loadedHotel.deluxePrice}
                    valid = {true}
                />
                <Input
                    id="standardNumOfRooms"
                    element="input"
                    type="number"
                    label="Standard Rooms Available"
                    validators={[VALIDATOR_MIN(5)]}
                    errorText = "Please enter a valid number of standard rooms"
                    onInput = {inputHandler}
                    value = {loadedHotel.standardNumOfRooms}
                    valid = {true}
                />
                <Input
                    id="standardPrice"
                    element="input"
                    type="number"
                    label="Standard Price per Night"
                    validators={[VALIDATOR_MIN(30)]}
                    errorText = "Please enter a valid number of standard rooms"
                    onInput = {inputHandler}
                    value = {loadedHotel.standardPrice}
                    valid = {true}
                />
                <Input
                    id="suitesNumOfRooms"
                    element="input"
                    type="number"
                    label="Suites Rooms Available"
                    validators={[VALIDATOR_MIN(5)]}
                    errorText = "Please enter a valid number of suites"
                    onInput = {inputHandler}
                    value = {loadedHotel.suitesNumOfRooms}
                    valid = {true}
                />
                <Input
                    id="suitesPrice"
                    element="input"
                    type="number"
                    label="Suites Price per Night"
                    validators={[VALIDATOR_MIN(40)]}
                    errorText = "Please enter a valid price for suites"
                    onInput = {inputHandler}
                    value = {loadedHotel.suitesPrice}
                    valid = {true}
                />
                <Button type="submit" disabled={!formState.isValid} >
                    UPDATE HOTEL
                </Button>

            </form>
            )}
        </React.Fragment>
    );

};

export default UpdateHotel;