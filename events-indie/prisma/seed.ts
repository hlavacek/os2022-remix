import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  // clean up all events for seed
  await prisma.event.deleteMany().catch(() => {});

  const events: Prisma.EventCreateInput[] = [
    {
      name: "Openslava 2022",
      start: new Date("2022-10-19T00:00:00.000Z"),
      end: new Date("2022-10-20T23:59:59.000Z"),
      link: "https://www.openslava.sk/",
      description:
        "ACCENTURE CONFERENCE ON EMERGING TECHNOLOGIES AND OPEN SOURCE",
    },
    {
      name: "Django Girls",
      start: new Date("2022-10-11T00:00:00.000Z"),
      end: new Date("2022-10-11T23:59:59.000Z"),
      link: "https://djangogirls.org/en/bratislava_sk/",
      description:
        "Workshop pre ženy, na ktorom sa bezplatne naučíš programovať",
    },
    {
      name: "PYCON SK 2022",
      start: new Date("2022-10-09T00:00:00.000Z"),
      end: new Date("2022-10-11T23:59:59.000Z"),
      link: "https://2022.pycon.sk/",
      description:
        "Workshop pre ženy, na ktorom sa bezplatne naučíš programovať",
    },
  ];

  for (const e of events) {
    await prisma.event.create({
      data: e,
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
