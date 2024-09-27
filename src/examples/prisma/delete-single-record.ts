import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 指定のユーザーの email を更新します。
  const user = await prisma.post.delete({
    where: {
      id: 1
    }
  });
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