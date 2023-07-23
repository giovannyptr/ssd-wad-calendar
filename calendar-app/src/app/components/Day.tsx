import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Event from './Event';
import styles from './Day.module.css';
import { to12HourFormat } from './utils/timeFormat';

type CalendarEvent = {
    id: string;
    name: string;
    time: string;
    invitees: string;
    color: string; 
}

const Day: React.FC<{ day: Date }> = ({ day }) => {
    const dayString = day.toISOString().split('T')[0];
    const [events, setEvents] = useState<CalendarEvent[]>([]);  // initialize with empty array
    const [showEventForm, setShowEventForm] = useState<boolean>(false);
    const [eventName, setEventName] = useState<string>('');
    const [eventTime, setEventTime] = useState<string>('');
    const [eventInvitees, setEventInvitees] = useState<string>('');

    // This useEffect will only run in the browser, after the component has been rendered
    useEffect(() => {
        // Try to get the events from localStorage
        const storedEvents = localStorage.getItem(dayString);
        if (storedEvents) {
            setEvents(JSON.parse(storedEvents));
        }
    }, []);

    const getRandomColor = (): string => {
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    const addEvent = (e: React.FormEvent) => {
        e.preventDefault();
        if (events.length < 3) {
            const newEvent = {
                id: uuidv4(),
                name: eventName,
                time: eventTime,
                invitees: eventInvitees,
                color: getRandomColor(), // assign a random color to the new event
            };
            const newEvents = [...events, newEvent];
            setEvents(newEvents);
            setShowEventForm(false);
            setEventName('');
            setEventTime('');
            setEventInvitees('');
            localStorage.setItem(dayString, JSON.stringify(newEvents));
        } else {
            alert('Maximum of 3 events per day reached.');
        }
    };


    const deleteEvent = (id: string) => {
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
        localStorage.setItem(dayString, JSON.stringify(updatedEvents));
    };

    const showForm = () => {
        setShowEventForm(true);
    };


    return (
        <div className={styles.day} >
            <h2 className={styles.dayHeader}>{day.getDate()}</h2>
            <button onClick={showForm}>Add Event</button>
            {showEventForm && (
                <form onSubmit={addEvent}>
                    <input
                        type="text"
                        name="eventName"
                        placeholder="Event Name"
                        value={eventName}
                        onChange={e => setEventName(e.target.value)}
                    />
                    <input
                        type="text"
                        name="eventTime"
                        placeholder="Event Time (24hr format, eg. 13:00)"
                        value={eventTime}
                        onChange={e => setEventTime(e.target.value)}
                    />
                    <input
                        type="text"
                        name="eventInvitees"
                        placeholder="Event Invitees"
                        value={eventInvitees}
                        onChange={e => setEventInvitees(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </form>
            )}
            <div className={styles.dayEvents}>
                {events.map(event => (
                    <Event
                        key={event.id}
                        event={event}
                        deleteEvent={deleteEvent}
                    />
                ))}
            </div>
        </div>
    );
};

export default Day;
