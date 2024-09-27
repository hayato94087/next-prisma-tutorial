import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 指定の文字列がtitleに含まれる投稿を削除します。
  const user = await prisma.post.deleteMany({
    where: {
      title: {
        contains: 'My',
      }
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