const fetcher = (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init).then((res) => res.json());

export const register = (id: string, name: string) =>
  fetch(`/api/events/${id}/registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: name,
    }),
  });

export default fetcher;
