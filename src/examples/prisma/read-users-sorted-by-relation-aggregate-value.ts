import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ユーザーを投稿数の降順で取得
  const users = await prisma.user.findMany({
    orderBy: {
      posts: {
        _count: "desc"
      }
    },
    include: {
      posts: true
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