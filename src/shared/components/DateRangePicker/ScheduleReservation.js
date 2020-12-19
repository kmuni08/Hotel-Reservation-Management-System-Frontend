import React from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker } from 'react-dates';

const ScheduleReservation = (props) => {

    const [range, $range] = React.useState({
        startDate: null,
        endDate: null
    });

    const [focus, $focus] = React.useState(null);

    if (range.startDate != null && range.endDate != null) {
        // let start_date = range.startDate
        // let start_date_month = start_date._d.getMonth() + 1;
        // localStorage.setItem('start_month_picked', String(start_date_month));
        // let start_date_date = start_date._d.getDate();
        // localStorage.setItem('start_date_picked', String(start_date_date));
        // let start_date_full_year = start_date._d.getFullYear()
        // localStorage.setItem('start_year_picked', String(start_date_full_year));
        // let end_date = range.endDate
        // let end_date_month = end_date._d.getMonth() + 1;
        // localStorage.setItem('end_month_picked', String(end_date_month));
        // let end_date_date = end_date._d.getDate()
        // localStorage.setItem('end_date_picked', String(end_date_date));
        // let end_date_full_year = end_date._d.getFullYear()
        // localStorage.setItem('end_year_picked', String(end_date_full_year));

    }


    return(
        <div className="ScheduleReservation">
            <DateRangePicker
                startDate={range.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={range.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => $range({ startDate, endDate })} // PropTypes.func.isRequired,
                focusedInput={focus} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => $focus(focusedInput)} // PropTypes.func.isRequired,
            />
        </div>
    );
}

export default ScheduleReservation