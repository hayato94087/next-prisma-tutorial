import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // 指定のユーザーの email を更新します。
  const users = await prisma.user.upsert({
    where: {
      email: 'alice@example.com',
    },
    update: {
      name: 'Alice Jackson',
      role: 'ADMIN'
    },
    create: {
      email: 'alice@example.com',
      name: 'Alice Jackson',
      role: 'ADMIN',
      password: await bcrypt.hash('alicepass', 10),
    },
    include: {
      profile: true,
    }
  });
  console.dir(users, {depth: null});
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