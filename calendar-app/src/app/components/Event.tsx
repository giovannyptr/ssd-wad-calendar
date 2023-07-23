import React, { useState, useEffect } from 'react';
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
    updateEvent: (id: string, event: Omit<CalendarEvent, 'id'>) => void;
  };
  
const Event: React.FC<EventProps> = ({ event, deleteEvent, updateEvent }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(event.name);
  const [time, setTime] = useState<string>(event.time);
  const [invitees, setInvitees] = useState<string>(event.invitees);

  const saveEdits = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent(event.id, { name, time, invitees, color: event.color });
    setEditing(false);
  };

  if (editing) {
    return (
      <form onSubmit={saveEdits}>
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="time"
          name="eventTime"
          placeholder="Event Time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <input
          type="text"
          name="eventInvitees"
          placeholder="Event Invitees"
          value={invitees}
          onChange={e => setInvitees(e.target.value)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={() => setEditing(false)}>Cancel</button>
      </form>
    );
  }

  return (
    <div style={{ backgroundColor: event.color }}>
      <h3>{event.name}</h3>
      <p>{to12HourFormat(event.time)}</p>
      <p>{event.invitees}</p>
      <button onClick={() => setEditing(true)}>Edit</button>
      <button onClick={() => deleteEvent(event.id)}>Delete</button>
    </div>
  );
};

export default Event;
