import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // id の昇順で並べ替えて最初の 1 件のレコードを取得します。
  const users = await prisma.user.findMany({
    take: 1,
    orderBy: {
      id: 'asc'
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