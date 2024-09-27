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
      profile: {
        create: { // create で複数のデータを書き込む
          bio: "I'm a software engineer",
        },
      },
      posts: {
        // createMany で複数のデータを書き込む。この場合は、data でデータを指定
        createMany: {
          data: [
            {
              title: "How to use Prisma Client",
              content: "Prisma Client is the best",
            },
            {
              title: "How to use Prisma Migrate",
              content: "Prisma Migrate is the best",
            },
          ],
        },
      },
    },
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