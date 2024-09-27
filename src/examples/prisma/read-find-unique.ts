import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // email が alice@example.com のユーザーを取得します。
  const user = await prisma.user.findUnique({
    where: {
      email: 'alice@example.com',
    },
  })
  console.dir(user, {depth: null});
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