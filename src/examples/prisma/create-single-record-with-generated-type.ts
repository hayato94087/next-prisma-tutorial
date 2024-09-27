import { PrismaClient, Role, type Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // Delete all data
  await prisma.category.deleteMany();
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // User テーブルへの create にデータ投入する型は Prisma.UserCreateInput を使用します。
  const user: Prisma.UserCreateInput = {
    email: "alice@prisma.io",
    name: "Alice",
    password: await bcrypt.hash("fdaKfk3lafd", 10),
    role: Role.USER,
  }

  // User テーブルへデータを追加
  const createUser = await prisma.user.create({ data : user })
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