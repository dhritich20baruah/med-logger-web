"use client"
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className='m-10'>
      <Calendar
        onChange={onChange}
        value={date}
        className="bg-white shadow-md rounded-lg p-4"
        calendarType="US"
        locale="en-US"
        tileClassName={({ date, view }) => {
          // Add custom classes to calendar tiles based on date or view
          return 'text-sm p-2';
        }}
      />
    </div>
  );
};

export default MyCalendar;
