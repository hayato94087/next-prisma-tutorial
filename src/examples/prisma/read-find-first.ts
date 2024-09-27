import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // id を昇順で並べ替えて最初のレコードを取得します。
  const users = await prisma.user.findFirst({
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