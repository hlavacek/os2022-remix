import type { Event } from "@prisma/client";
import { prisma } from "~/db.server";

export type { Event } from "@prisma/client";

export async function getEventsWithRegistrationCount() {
  return prisma.event.findMany({
    include: {
      _count: {
        select: {
          registrations: true,
        }
      }
    },
  });
}

/**
 * Get event by id
 */
export async function getEventById(id: Event["id"]) {
  return prisma.event.findUnique({
    where: { id },
  });
}