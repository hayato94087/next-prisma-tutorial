import { PrismaClient, Role, type Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // Delete all data
  await prisma.category.deleteMany();
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // UserテーブルへcreateManyでデータ投入する型はPrisma.UserCreateInput[] を使用します。
  const users: Prisma.UserCreateInput[] = [
    {
      email: "alice@prisma.io",
      name: "Alice",
      password: await bcrypt.hash("fdaKfk3lafd", 10),
      role: Role.USER,
    },
    {
      email: "bob@prisma.io",
      name: "Bob",
      password: await bcrypt.hash("diaofkLdkfala", 10),
      role: Role.ADMIN,
    },
  ];

  // User テーブルへデータを追加
  const createUsers = await prisma.user.createMany({ data: users });
  console.dir(createUsers, {depth: null});
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