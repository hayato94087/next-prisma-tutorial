import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // User テーブルから email の末尾が b@example.com であるユーザーをすべて取得します。
  const users = await prisma.user.findMany({
    where: {
      email: {
        endsWith: 'b@example.com'
      }
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