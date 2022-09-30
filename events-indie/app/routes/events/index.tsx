import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getEventsWithRegistrationCount } from "~/models/event.server";

// have mock list of events to be displayed
export async function loader({ request }: LoaderArgs) {
  const eventsWithRegitrationCount = await getEventsWithRegistrationCount();
  return json({
    events: [...eventsWithRegitrationCount],
  });
}

export default function EventsIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="m-8 flex h-full flex-col bg-white">
      <h2>Events</h2>
      {data &&
        data.events.map((event) => (
          <div key={event.id}>
            <span className="font-bold">{event.name}</span>
            <span className="ml-3">
              Registrations: {event._count.registrations}
            </span>
          </div>
        ))}
      <Outlet />
    </main>
  );
}
