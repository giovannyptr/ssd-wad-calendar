import React from 'react';
import styles from './Event.module.css';
import { to12HourFormat } from './utils/timeFormat'


type CalendarEvent = {
    id: string;
    name: string;
    time: string;
    invitees: string;
    color: string; 
}

type EventProps = {
    event: CalendarEvent;
    deleteEvent: (id: string) => void;
};

const Event: React.FC<EventProps> = ({ event, deleteEvent }) => {
    const handleDelete = () => {
        deleteEvent(event.id);
    };

    return (
        <div className={styles.event} style={{backgroundColor: event.color}}>
            <h3>{event.name}</h3>
            <p>{to12HourFormat(event.time)}</p>
            <p>Invitees: {event.invitees}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default Event;
