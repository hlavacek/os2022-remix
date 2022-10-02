import type { Registration } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";

type RegistrationListData = {
  registrations: Registration[];
};

const RegistrationList = () => {
  // example of used loader data in a nested component
  const { registrations } = useLoaderData<RegistrationListData>();

  return (
    <ul>
      {registrations?.length
        ? registrations.map((registration: Registration) => (
            <li key={registration.id}>{registration.user}</li>
          ))
        : null}
    </ul>
  );
};

export default RegistrationList;
