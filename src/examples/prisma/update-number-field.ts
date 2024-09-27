import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 指定のユーザーが存在しない場合は新規作成し、存在する場合は更新します。
  const users = await prisma.user.update({
    where: {
      email: 'alice@example.com',
    },
    data: {
      profile: {
        update: {
          age: {
            increment: 1,
          }
        }
      }
    },
    include:{
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