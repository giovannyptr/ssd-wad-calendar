'use client'
import React from 'react';
import Day from './Day';
import styles from './Calendar.module.css';

const Calendar: React.FC = () => {
  // Generate an array with the number of days for the current month
  const getDaysInMonth = (month: number, year: number): Date[] => {
    return new Array(31).fill('').map((v,i) => new Date(year, month-1, i+1)).filter(v => v.getMonth() === month-1);
  }

  const currentMonth = new Date().getMonth();  // JavaScript months are 0-11
  const currentYear = new Date().getFullYear();
  const days = getDaysInMonth(currentMonth + 1, currentYear);

  // Array of month names
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className={styles.calendar}>
      <h1 className={styles.calendarHeader}>{`${monthNames[currentMonth]} ${currentYear}`}</h1>
      {days.map((day, index) => <Day key={index} day={day} />)}
    </div>
  );
}

export default Calendar;
