import React, { useState } from 'react';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import './HotelItems.css';


const HotelItems = props => {
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
        console.log('DELETING...');
    };


    return (
        <React.Fragment>
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
            <Modal
                show={showConfirmModal}
                onCancel = {cancelDeleteHandler}
                header = "Are you sure?"
                footerClass = "hotel-user-item__modal-action"
                footer = {
                    <React.Fragment>
                        <Button inverse onClick = {cancelDeleteHandler}> CANCEL </Button>
                        <Button danger onClick = {confirmDeleteHandler}> DELETE </Button>
                    </React.Fragment>
                }>
                <p>
                    Do you want to proceed and delete this place? It cannot be undone.
                </p>
            </Modal>
            <li className="hotel-user-item">
                <Card className="hotel-user-item__content">
                    <div className ="hotel-user-item__image">
                        <Avatar image = {props.image} alt ={props.name } />
                    </div>
                    <div className ="hotel-user-item__info">
                        <h2> {props.name}</h2>
                        <h3> {props.address} </h3>
                        <h3> {props.rating} stars rating</h3>
                        <h3> {props.description}</h3>
                    </div>
                    <div className = "hotel-user-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        <Button to={`/allhotels/${props.id}`} >REGISTER</Button>
                    </div>
                </Card>
            </li>
        </React.Fragment>

    )
};

export default HotelItems;