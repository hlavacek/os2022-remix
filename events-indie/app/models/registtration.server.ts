import type { Event, Registration } from "@prisma/client";
import { prisma } from "~/db.server";

/**
 * Create a new registration
 * @param id the ID of the event
 * @param name the name of the user to register
 * @returns created registration or existing registration if it is for the same name
 */
export async function createRegistration(
  id: Event["id"],
  name: Registration["user"]
) {
  // make sure we don't create a new registration, if there is one existing
  const existingRegistration = await prisma.registration.findFirst({
    where: {
      eventId: id,
      user: name,
    },
  });

  if (!existingRegistration) {
    const registration = await prisma.registration.create({
      data: {
        user: name,
        event: {
          connect: {
            id,
          },
        },
      },
    });
    return registration;
  } else {
    return existingRegistration;
  }
}
