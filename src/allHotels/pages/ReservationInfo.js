import React, { useEffect, useState, useContext }  from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from '../../shared/components/FormElements/Button';
import Card from "../../shared/components/UIElements/Card";
import './HotelForm.css';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const HotelInfo = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedReservation, setLoadedReservation] = useState();
    const hotelId = useParams().hotelId;
    const history = useHistory();

    const [setFormData] = useForm({
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
        const fetchReservation = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/reservations/${hotelId}`);
                setLoadedReservation(responseData.reservation);
                setFormData({
                    name: {
                        value: responseData.reservation.name,
                        isValid: true
                    },
                    address: {
                        value: responseData.reservation.address,
                        isValid: true
                    },
                    description: {
                        value: responseData.reservation.description,
                        isValid: true
                    },
                    deluxe_user_pick: {
                        value: responseData.reservation.deluxe_user_pick,
                        isValid: true
                    },
                    deluxePrice: {
                        value: responseData.reservation.deluxePrice,
                        isValid: true
                    },
                    standard_user_pick: {
                        value: responseData.reservation.standard_user_pick,
                        isValid: true
                    },
                    standardPrice: {
                        value: responseData.reservation.standardPrice,
                        isValid: true
                    },
                    suites_user_pick: {
                        value: responseData.reservation.suites_user_pick,
                        isValid: true
                    },
                    suitesPrice: {
                        value: responseData.reservation.suitesPrice,
                        isValid: true
                    }
                }, true);

            } catch (err) {}
        }
        fetchReservation();
    }, [sendRequest, hotelId, setFormData]);

    const hotelReservationCancelSubmitHandler = async event => {
        console.log('want to cancel');
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/reservations/cancel/${hotelId}`,
                'PATCH',
                null,
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

    if(!loadedReservation && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find a reservation!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error = {error} onClear = {clearError} />
            {!isLoading && loadedReservation && (
                <form className="hotel-form" onSubmit={hotelReservationCancelSubmitHandler}>

                    <h4> Name of the Hotel: {loadedReservation.name} </h4>
                    <h4> Address: {loadedReservation.address} </h4>
                    <h4> {loadedReservation.description} </h4>
                    <h4> Deluxe Rooms: {loadedReservation.deluxe_user_pick} rooms reserved, Price: ${loadedReservation.deluxePrice}</h4>
                    <h4> Standard Rooms: {loadedReservation.standard_user_pick} rooms reserved, Price: ${loadedReservation.standardPrice}</h4>
                    <h4> Suites Rooms: {loadedReservation.suites_user_pick} rooms reserved, Price: ${loadedReservation.suitesPrice}</h4>
                    <h4> Payment in Total: $ {loadedReservation.totalPayment} </h4>
                    <Button type="submit">
                        CANCEL RESERVATION
                    </Button>
                </form>

            )};
        </React.Fragment>
    );
};

export default HotelInfo;