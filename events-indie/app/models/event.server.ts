import { prisma } from "~/db.server";

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

