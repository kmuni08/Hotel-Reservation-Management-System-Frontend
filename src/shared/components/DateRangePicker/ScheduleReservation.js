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