import React, { useState, useEffect } from 'react';

const DateTime = () => {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => setDateTime(new Date()), 1000);
        return () => {
            clearInterval(id);
        }
    }, []);

    return (
        <h1>{`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`}</h1>
    );

}

export default DateTime;