import React, { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
// import { Event } from '../api/types';
import fetcher, { register } from '../api/api';

const Events = () => {
  const { id } = useParams();
  const { data: eventForRegistration, error } = useSWR(`/api/events/${id}`, fetcher);
  const [name, setName] = useState<string>('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleSubmit = async () => {
    if (id && name) {
      await register(id, name);
    }
  };

  return (
    <div className="ml-10">
      {error && <span className="text-color-red">Failed to fetch event {id}</span>}
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
        </div>
      )}
    </div>
  );
};

export default Events;
