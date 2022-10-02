import { ActionFunction, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import RegistrationList from "~/components/RegistrationList";
import { getEventById } from "~/models/event.server";
import {
  createRegistration,
  getEventRegistrations,
} from "~/models/registtration.server";

export async function loader({ params }: LoaderArgs) {
  invariant(params.eventId, "eventId not found");

  const event = await getEventById(+params.eventId);

  if (!event) {
    throw new Response("Not Found", { status: 404 });
  }

  // add registrations to the loader data
  const registrations = await getEventRegistrations(+params.eventId);

  return json({
    event,
    registrations,
  });
}

type ActionData =
  | {
      name: null | string;
      eventId: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const name = formData.get("name");
  const eventIdString = params.eventId;

  const errors: ActionData = {
    eventId: eventIdString ? null : "Event ID is required",
    name: name ? null : "Name is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  await createRegistration(+(eventIdString || 0), name as string);
  return redirect("/events");
};

export default function EventDetailsPage() {
  const data = useLoaderData<typeof loader>();
  const errors = useActionData();

  return (
    <main className="m-8 flex h-full flex-col bg-white">
      <h2 className="text-2xl font-bold">{data.event.name}</h2>
      <p className="py-6">{data.event.description}</p>
      <h3 className="text-xl font-bold">New registration</h3>
      <Form method="post">
        {errors?.name ? (
          <div className="text-red-600">{errors.name}</div>
        ) : null}
        <input type="text" name="name" className="mr-2 rounded" />
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Register
        </button>
      </Form>
      <h3 className="text-xl font-bold">Registered users</h3>
      <RegistrationList />
    </main>
  );
}
