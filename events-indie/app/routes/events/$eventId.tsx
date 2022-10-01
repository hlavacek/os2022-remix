import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

export default function EventDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="m-8 flex h-full flex-col bg-white">
      <h2 className="text-2xl font-bold">{data.event.name}</h2>
      <p className="py-6">{data.event.description}</p>
    </main>
  );
}
