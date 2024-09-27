import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // Delete all data
  await prisma.category.deleteMany();
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // ユーザーを1件作成
  const createUser = await prisma.user.create({
    data: {
      email: "alice@prisma.io",
      name: "Alice",
      password: await bcrypt.hash("fdaKfk3lafd", 10),
      role: Role.USER,
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