import React, { ChangeEvent, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { Link, useParams } from 'react-router-dom';
import fetcher, { register } from '../api/api';
import { Registration } from '../api/types';

const Events = () => {
  const { id } = useParams();
  const { mutate } = useSWRConfig();
  const { data: eventForRegistration, error } = useSWR(`/api/events/${id}`, fetcher);
  const { data: registrations, error: registrationError } = useSWR(`/api/events/${id}/registrations`, fetcher);
  const [name, setName] = useState<string>('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleSubmit = async () => {
    if (id && name) {
      await register(id, name);
      mutate(`/api/events/${id}/registrations`);
      setName('');
    }
  };

  return (
    <div className="ml-10">
      {error && <span className="text-color-red">Failed to fetch event {id}</span>}
      {registrationError && <span className="text-color-red">Failed to fetch event {id} registrations</span>}
      {eventForRegistration && (
        <div className="w-full">
          <h2 className="text-2xl font-bold underline">Register to {eventForRegistration.name}</h2>
          <label htmlFor="name">
            Your name:
            <input
              id="name"
              className="ml-2 pl-2 border text-sm rounded-md border-gray-900"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </label>
          <button
            type="submit"
            onClick={handleSubmit}
            className="ml-2 pl-2 pr-2 bg-blue-600 text-white border text-sm rounded-md border-gray-900"
          >
            Register
          </button>
          <Link className="ml-2 text-blue-700" to="/">
            Back to events
          </Link>
          {registrations?.length ? (
            <div className="mt-3">
              <h3 className="text-xl font-bold">Existing registrations {eventForRegistration.name}</h3>
              <ul>
                {registrations.map((registration: Registration) => (
                  <li key={registration.id}>{registration.user}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Events;
