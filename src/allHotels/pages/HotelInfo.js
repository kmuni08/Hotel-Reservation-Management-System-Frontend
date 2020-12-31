import React, { useEffect, useState, useContext }  from 'react';
import { useParams, useHistory  } from 'react-router-dom';
import {VALIDATOR_REQUIRE, VALIDATOR_MIN} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from "../../shared/components/UIElements/Card";
import ScheduleReservation from "../../shared/components/DateRangePicker/ScheduleReservation";
import './HotelForm.css';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const HotelInfo = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedHotel, setLoadedHotel] = useState();
    const hotelId = useParams().hotelId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
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

    useEffect(() => {
        const fetchHotel = async () => {
            try {

                const responseData = await sendRequest(`http://localhost:5000/api/hotels/${hotelId}`);
                setLoadedHotel(responseData.hotel);
                setFormData({
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
        }

        fetchHotel();
    }, [sendRequest, hotelId, setFormData]);

    const hotelReservationSubmitHandler = async event => {
        if(formState.inputs.deluxe_user_pick.value === '0' && formState.inputs.suites_user_pick.value === '0' && formState.inputs.standard_user_pick.value === '0') {
            console.log('hello')
            alert('You cannot have all the rooms as 0');
            return;
        }
        else if(formState.inputs.deluxe_user_pick.value === undefined || formState.inputs.suites_user_pick.value === undefined || formState.inputs.standard_user_pick.value === undefined) {
            alert('All the text fields must have specified number of rooms');
            return;
        }
        console.log('submitted');
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/reservations`,
                'POST',
                JSON.stringify({
                    name: formState.inputs.name.value,
                    address: formState.inputs.address.value,
                    description: formState.inputs.description.value,
                    hotelId: hotelId,
                    deluxeNumOfRooms: formState.inputs.deluxeNumOfRooms.value,
                    deluxe_user_pick: parseInt(formState.inputs.deluxe_user_pick.value),
                    deluxePrice: formState.inputs.deluxePrice.value,
                    standardNumOfRooms: formState.inputs.standardNumOfRooms.value,
                    standard_user_pick: parseInt(formState.inputs.standard_user_pick.value),
                    standardPrice: formState.inputs.standardPrice.value,
                    suitesNumOfRooms: formState.inputs.suitesNumOfRooms.value,
                    suites_user_pick: parseInt(formState.inputs.suites_user_pick.value),
                    suitesPrice: formState.inputs.suitesPrice.value
                }),
                {
                    'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/allhotels');
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
                    <h2>Could not do a reservation, cannot find hotel!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error = {error} onClear = {clearError} />
            {!isLoading && loadedHotel && (
                <form className="hotel-form" onSubmit={hotelReservationSubmitHandler}>

                    <h4> Name of the Hotel: {loadedHotel.name} </h4>
                    <h4> Address: {loadedHotel.address} </h4>
                    <h4> {loadedHotel.description} </h4>
                    <ScheduleReservation />
                    <h4> Deluxe Rooms Available: {loadedHotel.deluxeNumOfRooms} rooms available, Price: ${loadedHotel.deluxePrice} per night</h4>
                    <Input
                        id = "deluxe_user_pick"
                        element= "input"
                        type = "number"
                        label = "Deluxe"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                        errorText="Please enter a valid number of deluxe rooms."
                        onInput = {inputHandler}
                    />
                    <h4> Standard Rooms Available: {loadedHotel.standardNumOfRooms} rooms available, Price: ${loadedHotel.standardPrice} per night</h4>
                    <Input
                        id = "standard_user_pick"
                        element= "input"
                        type = "number"
                        label = "Standard"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                        errorText="Please enter a valid number of standard rooms."
                        onInput = {inputHandler}
                    />
                    <h4> Suites Rooms Available: {loadedHotel.suitesNumOfRooms} rooms available, Price: ${loadedHotel.suitesPrice} per night</h4>
                    <Input
                        id = "suites_user_pick"
                        element= "input"
                        type = "number"
                        label = "Suites"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
                        errorText="Please enter a valid number of suite rooms."
                        onInput = {inputHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        REGISTER FOR HOTEL
                    </Button>
                </form>

            )};
        </React.Fragment>
    );
};

export default HotelInfo;