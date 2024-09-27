import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // Delete all data
  await prisma.category.deleteMany();
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // Create a new user
  const createUser = await prisma.user.create({
    data: {
      email: "alice@prisma.io",
      name: "Alice",
      password: await bcrypt.hash("fdaKfk3lafd", 10),
      role: Role.USER,
      posts: {
        create: [ // create で複数のデータを書き込む
          {
            title: "How to use Prisma Client",
            content: "Prisma Client is the best",
            categories: {
              create: [ // create で複数のデータを書き込む
                {
                  name: "Prisma",
                },
                {
                  name: "Database",
                },
              ],
            },
          },
          {
            title: "How to use Prisma Migrate",
            content: "Prisma Migrate is the best",
          },
        ],
      },
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      password: true,
      posts: {
        // select posts
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          published: true,
          authorId: true,
          categories: {
            // select categories
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    }
  });
  console.dir(createUser, {depth: null});
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