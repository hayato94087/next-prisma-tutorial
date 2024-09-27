import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ユーザーを年齢の降順で取得します
  const users = await prisma.user.findMany({
    orderBy: {
      profile: {
        age: 'desc'
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