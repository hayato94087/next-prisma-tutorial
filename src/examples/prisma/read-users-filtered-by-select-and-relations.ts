import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ユーザーに紐づく、関連する`Post`の全フィールドと`Profile`の指定フィールドを取得します。
  const users = await prisma.user.findFirst({
    include: {
      posts: true,
      profile: {
        select: {
          bio: true,
        },
      },
    },
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