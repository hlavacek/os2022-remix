import { Prisma, PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
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

  res.json(events);
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
    res.json(event);
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
