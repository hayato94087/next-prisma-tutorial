import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // Delete all data
  await prisma.category.deleteMany();
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // posts や categories と指定することで、同時にデータを書き込むことができます。
  const createUser = await prisma.user.create({
    data: {
      email: "alice@prisma.io",
      name: "Alice",
      password: await bcrypt.hash("fdaKfk3lafd", 10),
      role: Role.USER,
      posts: {
        /**
         * 複数行の書き込みに create を指定することで更に関連する
         * 別テーブルのCategoryへデータを書き込むことができます。
         */
        create: [
          {
            title: "How to use Prisma Client",
            content: "Prisma Client is the best",
            categories: {
              /**
               * 複数行の書き込みに create を指定することで更に関連する
               * 別テーブルのCategoryへデータを書き込むことができます。
               */
              create: [
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