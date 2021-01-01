import React, { useEffect, useState, useContext }  from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from '../../shared/components/FormElements/Button';
import Card from "../../shared/components/UIElements/Card";
import './UserReservationForm.css';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const UserReservation = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUserReservation, setLoadedUserReservation] = useState();
    const userIdentification = useParams().userId;
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
        const fetchUserReservation = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/reservations/uid/${userIdentification}`);
                setLoadedUserReservation(responseData.reservationForUser);
                setFormData({
                    name: {
                        value: responseData.reservationForUser.name,
                        isValid: true
                    },
                    address: {
                        value: responseData.reservationForUser.address,
                        isValid: true
                    },
                    description: {
                        value: responseData.reservationForUser.description,
                        isValid: true
                    },
                    deluxe_user_pick: {
                        value: responseData.reservationForUser.deluxe_user_pick,
                        isValid: true
                    },
                    deluxePrice: {
                        value: responseData.reservationForUser.deluxePrice,
                        isValid: true
                    },
                    standard_user_pick: {
                        value: responseData.reservationForUser.standard_user_pick,
                        isValid: true
                    },
                    standardPrice: {
                        value: responseData.reservationForUser.standardPrice,
                        isValid: true
                    },
                    suites_user_pick: {
                        value: responseData.reservationForUser.suites_user_pick,
                        isValid: true
                    },
                    suitesPrice: {
                        value: responseData.reservationForUser.suitesPrice,
                        isValid: true
                    }
                }, true);

            } catch (err) {}
        }
        fetchUserReservation();
    }, [sendRequest, userIdentification, setFormData]);

    const adminDoneHandler = async event => {
        event.preventDefault();
        try {
            // await sendRequest(
            //     null,
            //     null,
            //     null,
            //     {
            //         'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token
            //     }
            // );
            history.push('/hotels/users');
        } catch (err) {}
    };

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if(!loadedUserReservation && !error) {
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
            {!isLoading && loadedUserReservation && (
                <form className="user-reservation-form" onSubmit={adminDoneHandler}>
                    <h4> Name of the Hotel: {loadedUserReservation.name} </h4>
                    <h4> Address: {loadedUserReservation.address} </h4>
                    <h4> {loadedUserReservation.description} </h4>
                    <h4> Deluxe Rooms: {loadedUserReservation.deluxe_user_pick} rooms reserved, Price: ${loadedUserReservation.deluxePrice}</h4>
                    <h4> Standard Rooms: {loadedUserReservation.standard_user_pick} rooms reserved, Price: ${loadedUserReservation.standardPrice}</h4>
                    <h4> Suites Rooms: {loadedUserReservation.suites_user_pick} rooms reserved, Price: ${loadedUserReservation.suitesPrice}</h4>
                    <h4> Payment in Total: $ {loadedUserReservation.totalPayment} </h4>
                    <Button type="submit">
                        DONE
                    </Button>
                </form>

            )};
        </React.Fragment>
    );
};

export default UserReservation;