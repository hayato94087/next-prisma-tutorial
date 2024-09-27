import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 指定のユーザーの email を更新します。
  const users = await prisma.user.updateMany({
    where: {
      email: {
        contains: 'example.com',
      }
    },
    data: {
      role: 'ADMIN',
    },
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