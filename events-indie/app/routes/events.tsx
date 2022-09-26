import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { useUser } from "~/utils";

// TODO: load all events and display them
export async function loader({ request }: LoaderArgs) {
  return json({
    events: [
      {
        id: 1,
        name: "Event 1",
        registrationCount: 0,
      },
    ],
  });
}

export default function EventsIndexPage() {
  const user = useUser();
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Event registration</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="m-8 flex h-full flex-col bg-white">
        <h2>Events</h2>
        {data &&
          data.events.map((event) => (
            <div key={event.id}>
              <span className="font-bold">{event.name}</span>
              <span className="ml-3">
                Registrations: {event.registrationCount}
              </span>
            </div>
          ))}
        <Outlet />
      </main>
    </div>
  );
}
