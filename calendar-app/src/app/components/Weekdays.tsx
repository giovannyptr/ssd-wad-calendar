import React from 'react';
import styles from './Weekdays.module.css';

const Weekdays: React.FC = () => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={styles.weekdayGrid}>
      {weekdays.map((day, index) => (
        <div key={index} className={styles.weekday}>
          {day}
        </div>
      ))}
    </div>
  );
};

export default Weekdays;
