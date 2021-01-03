import React, { useEffect, useState, useContext, useRef }  from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {VALIDATOR_REQUIRE, VALIDATOR_MIN} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from "../../shared/components/UIElements/Card";
import './HotelForm.css';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker } from 'react-dates';
import { AuthContext } from "../../shared/context/auth-context";

const HotelInfo = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedHotel, setLoadedHotel] = useState();
    const [range, $range] = React.useState({
        startDate: null,
        endDate: null
    });
    const [focus, $focus] = React.useState(null);
    const hotelId = useParams().hotelId;
    const customerId = auth.userId;
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

                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/hotels/${hotelId}`);
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

        let date = new Date();
        let start_date = range.startDate;
        let end_date = range.endDate
        console.log('submitted');
        console.log('Current Date Month', (date.getMonth() + 1).toString());
        console.log('Current Date Number', date.getUTCDate());
        console.log('Current Date Year', date.getFullYear());
        // console.log('Start Date Month', start_date_month);

        console.log("Start Date Month", start_date._d.getMonth() + 1);
        console.log("Start Date Num", start_date._d.getDate());
        console.log("Start Date Year", start_date._d.getFullYear());
        console.log("End Date Month", end_date._d.getMonth() + 1);
        console.log("End Date Num", end_date._d.getDate());
        console.log("End Date Year", end_date._d.getFullYear());

        event.preventDefault();

        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND_URL + `/reservations/${customerId}`,
                'POST',
                JSON.stringify({
                    userId: auth.userId,
                    name: formState.inputs.name.value,
                    address: formState.inputs.address.value,
                    description: formState.inputs.description.value,
                    hotelId: hotelId,
                    currentMonth: (date.getMonth() + 1).toString(),
                    currentDate: date.getUTCDate(),
                    currentYear: date.getFullYear(),
                    startDateMonth: start_date._d.getMonth() + 1,
                    startDateNum: start_date._d.getDate(),
                    startDateYear: start_date._d.getFullYear(),
                    endDateMonth: end_date._d.getMonth() + 1,
                    endDateNum: end_date._d.getDate(),
                    endDateYear: end_date._d.getFullYear(),
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
                    <DateRangePicker
                        startDate={range.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={range.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => $range({ startDate, endDate })} // PropTypes.func.isRequired,
                        focusedInput={focus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => $focus(focusedInput)} // PropTypes.func.isRequired,
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        REGISTER FOR HOTEL
                    </Button>
                </form>
            )}
        </React.Fragment>
    );
};

export default HotelInfo;