import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 指定のユーザーの email を更新します。
  const users = await prisma.user.update({
    where: {
      email: 'bob@example.com',
    },
    data: {
      email: 'bob_new_email@example.com',
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