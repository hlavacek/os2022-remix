import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getEventById } from "~/models/event.server";

export async function loader({ params }: LoaderArgs) {
  invariant(params.eventId, "eventId not found");

  const event = await getEventById(+params.eventId);

  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({
    event,
  });
}

export async function action() {
  // TODO: implement action for storing registration
}

export default function EventDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="m-8 flex h-full flex-col bg-white">
      <h2 className="text-2xl font-bold">{data.event.name}</h2>
      <p className="py-6">{data.event.description}</p>
      <Form method="post">
        <input type="text" name="name" className="mr-2 rounded" />
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Register
        </button>
      </Form>
    </main>
  );
}
