import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient({
  // Turn this on if you want prisma logging
  // log: ['query', 'info', 'warn', 'error'],
});
const app = express();

app.use(express.json());

app.get('/api/events', async (req, res) => {
  const events = await prisma.event.findMany({
    orderBy: [
      {
        start: 'asc',
      },
      {
        name: 'asc',
      },
    ],
  });

  const registrationCounts = await prisma.registration.groupBy({
    by: ['eventId'],
    _count: {
      eventId: true,
    },
  });

  res.json(
    events.map((event) => ({
      ...event,
      // fill in registration counts
      registrationCount: registrationCounts.find((cnt) => cnt.eventId === event.id)?._count.eventId || 0,
    })),
  );
});

const getEvent = async (id: string) => {
  const idNumber = parseInt(id);
  const event = await prisma.event.findFirstOrThrow({
    where: {
      id: idNumber,
    },
  });
  return event;
};

app.get('/api/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await getEvent(id);

    const registrationCount = await prisma.registration.count({
      where: {
        eventId: event.id,
      },
    });
    res.json({
      ...event,
      registrationCount,
    });
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

app.post('/api/events/:id/registrations', async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const idNumber = parseInt(id);

    // make sure we don't create a new registration, if there is one existing
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        eventId: idNumber,
        user: body.user,
      },
    });

    if (!existingRegistration) {
      const registration = await prisma.registration.create({
        data: {
          user: body.user,
          event: {
            connect: {
              id: idNumber,
            },
          },
        },
      });

      res.json(registration);
    } else {
      console.log('Tried to create new registration for existing user, skipping.');
      res.json(existingRegistration);
    }
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
});

app.get('/api/events/:id/registrations', async (req, res) => {
  const { id } = req.params;
  const idNumber = parseInt(id);
  const { user } = req.query;

  const registrations = await prisma.registration.findMany({
    where: {
      eventId: idNumber,
      ...(user ? { user: user as string } : {}),
    },
    orderBy: {
      user: 'asc',
    },
  });

  res.json(registrations);
});

const server = app.listen(4000, () =>
  console.log(`
  Server ready at: http://localhost:4000`),
);
