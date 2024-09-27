import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 年齢が30より大きいユーザーを取得します。
  const users = await prisma.user.findMany({
    where: {
      profile: {
        age: {
          gt: 30
        }
      }
    },
    include: {
      profile: true
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