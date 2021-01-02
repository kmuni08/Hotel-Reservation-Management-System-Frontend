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
    const [loadedReservationInfo, setLoadedReservationInfo] = useState();
    const hotelId = useParams().hotelId;
    const cust_id = auth.userId;
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
                const responseDataReserve = await sendRequest(`http://localhost:5000/api/reservations/${cust_id}/${hotelId}`);
                setLoadedReservationInfo(responseDataReserve.reservationByHotel);
                setFormData({
                    name: {
                        value: responseDataReserve.reservationByHotel.name,
                        isValid: true
                    },
                    address: {
                        value: responseDataReserve.reservationByHotel.address,
                        isValid: true
                    },
                    description: {
                        value: responseDataReserve.reservationByHotel.description,
                        isValid: true
                    },
                    deluxe_user_pick: {
                        value: responseDataReserve.reservationByHotel.deluxe_user_pick,
                        isValid: true
                    },
                    deluxePrice: {
                        value: responseDataReserve.reservationByHotel.deluxePrice,
                        isValid: true
                    },
                    standard_user_pick: {
                        value: responseDataReserve.reservationByHotel.standard_user_pick,
                        isValid: true
                    },
                    standardPrice: {
                        value: responseDataReserve.reservationByHotel.standardPrice,
                        isValid: true
                    },
                    suites_user_pick: {
                        value: responseDataReserve.reservationByHotel.suites_user_pick,
                        isValid: true
                    },
                    suitesPrice: {
                        value: responseDataReserve.reservationByHotel.suitesPrice,
                        isValid: true
                    }
                }, true);

            } catch (err) {}
        }
        fetchReservation();
    }, [sendRequest, hotelId, setFormData]);

    const hotelReservationCancelSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/reservations/cancel/${cust_id}/${hotelId}`,
                'DELETE',
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

    console.log('Loaded Reservation', loadedReservationInfo)
    if(!loadedReservationInfo && !error) {
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
            {!isLoading && loadedReservationInfo && (
                <form className="hotel-form" onSubmit={hotelReservationCancelSubmitHandler}>
                    <h4> Name of the Hotel: {loadedReservationInfo.name} </h4>
                    <h4> Address: {loadedReservationInfo.address} </h4>
                    <h4> {loadedReservationInfo.description} </h4>
                    <h4> Deluxe Rooms: {loadedReservationInfo.deluxe_user_pick} rooms reserved, Price: ${loadedReservationInfo.deluxePrice}</h4>
                    <h4> Standard Rooms: {loadedReservationInfo.standard_user_pick} rooms reserved, Price: ${loadedReservationInfo.standardPrice}</h4>
                    <h4> Suites Rooms: {loadedReservationInfo.suites_user_pick} rooms reserved, Price: ${loadedReservationInfo.suitesPrice}</h4>
                    <h4> Payment in Total: $ {loadedReservationInfo.totalPayment} </h4>
                    <Button type="submit">
                        CANCEL RESERVATION
                    </Button>
                </form>

            )};
        </React.Fragment>
    );
};

export default HotelInfo;