import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const events: Prisma.EventCreateInput[] = [
  {
    name: 'Openslava 2022',
    start: new Date('2022-10-19T00:00:00.000Z'),
    end: new Date('2022-10-20T23:59:59.000Z'),
    link: 'https://www.openslava.sk/',
    description: 'ACCENTURE CONFERENCE ON EMERGING TECHNOLOGIES AND OPEN SOURCE',
  },
  {
    name: 'Django Girls',
    start: new Date('2022-10-11T00:00:00.000Z'),
    end: new Date('2022-10-11T23:59:59.000Z'),
    link: 'https://djangogirls.org/en/bratislava_sk/',
    description: 'Workshop pre ženy, na ktorom sa bezplatne naučíš programovať',
  },
  {
    name: 'PYCON SK 2022',
    start: new Date('2022-10-09T00:00:00.000Z'),
    end: new Date('2022-10-11T23:59:59.000Z'),
    link: 'https://2022.pycon.sk/',
    description: 'Workshop pre ženy, na ktorom sa bezplatne naučíš programovať',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const e of events) {
    console.log('Creating event: ', e.name);
    const event = await prisma.event.create({
      data: e,
    });
    console.log(`Created event with id: ${event.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
