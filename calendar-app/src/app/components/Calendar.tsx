'use client'
import React from 'react';
import Day from './Day';
import Weekdays from './Weekdays';
import styles from './Calendar.module.css';

const Calendar: React.FC = () => {
  // Generate an array with the number of days for the current month
  const getDaysInMonth = (month: number, year: number): Date[] => {
    return new Array(31).fill('').map((v, i) => new Date(year, month - 1, i + 1)).filter(v => v.getMonth() === month - 1);
  }

  const currentMonth = new Date().getMonth() + 1;  // JavaScript months are 0-11, adding 1 to make it 1-12
  const currentYear = new Date().getFullYear();
  const currentMonthStartDay = new Date(currentYear, currentMonth - 1, 1).getDay();  // Sunday is 0, Monday is 1, etc.
  const days = new Array(currentMonthStartDay).fill(null).concat(getDaysInMonth(currentMonth, currentYear));

  // Array of month names
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonthName = monthNames[new Date().getMonth()];

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (

    <div className={styles.calendar}>
      <h1 className={styles.calendarHeader}>{`${currentMonthName} ${currentYear}`}</h1>
      <div className={styles.dayGrid}>
        {weekdays.map((day, index) => <div key={index} className={styles.weekday}>{day}</div>)}
        {days.map((day, index) => day ? <Day key={index + 7} day={day} /> : <div key={index + 7} />)}
      </div>
    </div>
  );
}

export default Calendar;
