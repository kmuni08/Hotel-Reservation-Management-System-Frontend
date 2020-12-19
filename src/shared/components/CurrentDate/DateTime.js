import React, { useState, useEffect } from 'react';

const DateTime = () => {
    const [dateTime, setDateTime] = useState(new Date());

    // let month = dateTime.getMonth() + 1
    // localStorage.setItem('current_month', String(month));
    // let date = dateTime.getDate()
    // localStorage.setItem('current_date', String(date));
    // let year = dateTime.getFullYear()
    // localStorage.setItem('current_year', String(year));

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