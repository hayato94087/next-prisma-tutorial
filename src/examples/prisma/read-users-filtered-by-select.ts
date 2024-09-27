import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // email フィールドのみを取得します。
  const users = await prisma.user.findMany({
    select: {
      email: true,
    }
  });
  console.dir(users, { depth: null });
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