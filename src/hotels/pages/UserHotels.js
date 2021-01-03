import React, { useEffect, useState } from 'react';
import HotelsList from '../components/HotelsList';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from 'react-router-dom';


const UserHotels = () => {
    const [loadedHotels, setLoadedHotels] = useState();
    const {isLoading, error, sendRequest, clearError } = useHttpClient();

    //returns an object which has dynamic segments as properties.
    const userId = useParams().userId;

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/hotels/user/${userId}`);
                setLoadedHotels(responseData.hotels);
            } catch(err) {}
        };
        fetchHotels();
    }, [sendRequest, userId]);

    const hotelDeletedHandler = deletedHotelId => {
        setLoadedHotels(prevHotels =>
            prevHotels.filter(hotel => hotel.id !== deletedHotelId)
        );
    };

    return(
        <React.Fragment>
            <ErrorModal error = {error} onClear = {clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner/>
                </div>
            )}
            {!isLoading && loadedHotels && <HotelsList hotels = {loadedHotels} onDeleteHotel={hotelDeletedHandler} />}

        </React.Fragment>
    )
};

export default UserHotels;