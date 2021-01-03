import React, { useEffect, useState }  from 'react';
import HotelLists from '../components/HotelLists';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const AllHotels = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedHotels, setLoadedHotels] = useState();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + '/hotels'
                );

                setLoadedHotels(responseData.hotels);
            } catch (err) {}
        };
        fetchHotels();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedHotels && <HotelLists hotels={loadedHotels} />}
        </React.Fragment>
    );

};

export default AllHotels;