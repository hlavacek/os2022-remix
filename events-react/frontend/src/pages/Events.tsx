import React from 'react';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { Event } from '../api/types';

import fetcher from '../api/api';

const Events = () => {
  const { data, error } = useSWR('/api/events', fetcher);

  return (
    <div className="ml-10">
      <h2 className="text-2xl font-bold underline">Events</h2>
      {error && <span className="text-color-red">Failed to fetch events</span>}
      {data &&
        data.map((event: Event) => (
          <div key={event.id}>
            <span className="font-bold">{event.name}</span>
            <span className="ml-3">Registrations: {event.registrationCount}</span>
            <Link className="ml-4 text-blue-700" to={`/event/${event.id}`}>
              Register
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Events;
