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
    const event = getEvent(id);
    res.json(event);
  } catch (e) {
    console.log(e);
    res.status(404).send();
  }
});

app.post('/api/register/:id', async (req, res) => {
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

// get registrations

// app.post(`/signup`, async (req, res) => {
//   const { name, email, posts } = req.body;

//   const postData = posts?.map((post: Prisma.PostCreateInput) => {
//     return { title: post?.title, content: post?.content };
//   });

//   const result = await prisma.user.create({
//     data: {
//       name,
//       email,
//       posts: {
//         create: postData,
//       },
//     },
//   });
//   res.json(result);
// });

// app.post(`/post`, async (req, res) => {
//   const { title, content, authorEmail } = req.body;
//   const result = await prisma.post.create({
//     data: {
//       title,
//       content,
//       author: { connect: { email: authorEmail } },
//     },
//   });
//   res.json(result);
// });

// app.put('/post/:id/views', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await prisma.post.update({
//       where: { id: Number(id) },
//       data: {
//         viewCount: {
//           increment: 1,
//         },
//       },
//     });

//     res.json(post);
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` });
//   }
// });

// app.put('/publish/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const postData = await prisma.post.findUnique({
//       where: { id: Number(id) },
//       select: {
//         published: true,
//       },
//     });

//     const updatedPost = await prisma.post.update({
//       where: { id: Number(id) || undefined },
//       data: { published: !postData?.published },
//     });
//     res.json(updatedPost);
//   } catch (error) {
//     res.json({ error: `Post with ID ${id} does not exist in the database` });
//   }
// });

// app.delete(`/post/:id`, async (req, res) => {
//   const { id } = req.params;
//   const post = await prisma.post.delete({
//     where: {
//       id: Number(id),
//     },
//   });
//   res.json(post);
// });

// app.get('/users', async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.get(`/post/:id`, async (req, res) => {
//   const { id }: { id?: string } = req.params;

//   const post = await prisma.post.findUnique({
//     where: { id: Number(id) },
//   });
//   res.json(post);
// });

// app.get('/feed', async (req, res) => {
//   const { searchString, skip, take, orderBy } = req.query;

//   const or: Prisma.PostWhereInput = searchString
//     ? {
//         OR: [{ title: { contains: searchString as string } }, { content: { contains: searchString as string } }],
//       }
//     : {};

//   const posts = await prisma.post.findMany({
//     where: {
//       published: true,
//       ...or,
//     },
//     include: { author: true },
//     take: Number(take) || undefined,
//     skip: Number(skip) || undefined,
//     orderBy: {
//       updatedAt: orderBy as Prisma.SortOrder,
//     },
//   });

//   res.json(posts);
// });

const server = app.listen(4000, () =>
  console.log(`
  Server ready at: http://localhost:4000`),
);
