import React, { useState, useContext } from 'react';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from "../../shared/hooks/http-hook";
import './HotelItems.css';


const HotelItems = props => {
    const {isLoading, error, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    return (
        <React.Fragment>
            <ErrorModal error = {error} onClear = {clearError} />
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header = {props.address}
                contentClass = "hotel-user-item__modal-content"
                footerClass ="hotel-user-item__modal-actions"
                footer = {<Button onClick = {closeMapHandler}>CLOSE</Button>}
            >
                <div className = "map_container">
                    <Map center={props.coordinates} zoom={16} />
                </div>
            </Modal>
            <li className="hotel-user-item">
                <Card className="hotel-user-item__content">
                    {isLoading && <LoadingSpinner as Overlay />}
                    <div className ="hotel-user-item__image">
                        <Avatar image = {props.image} alt ={props.name } />
                    </div>
                    <div className ="hotel-user-item__info">
                        <h2> {props.name}</h2>
                        <h3> {props.address} </h3>
                        <h3> {props.description}</h3>
                    </div>
                    {auth.userId && (
                        <div className = "hotel-user-item-logged-in__actions">
                            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                            <Button to={`/allhotels/${props.id}`} >REGISTER</Button>
                            {auth.userId && (
                                <Button to={`/allhotels/reservation/${props.id}`} >View Registration</Button>
                            )}

                        </div>
                    )}

                    {!auth.userId && (
                        <div className = "hotel-user-item__actions">
                            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                            <Button to={`/allhotels/${props.id}`} >REGISTER</Button>

                        </div>
                    )}
                </Card>
            </li>
        </React.Fragment>

    )
};

export default HotelItems;