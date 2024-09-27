import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // nameがBで始まるユーザー、または、profileのageが30未満でroleがUSERで、かつ、postsのtitleにCodingが含まれるユーザーを取得
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            startsWith: "B",
          },
        },
        {
          AND: {
            profile: {
              age: {
                lt: 30,
              },
            },
            role: {
              equals: "USER",
            },
            posts: {
              some: {
                title: {
                  contains: "Coding",
                },
              },
            },
          },
        },
      ],
    },
    include:{
      posts: true,
      profile: true,
    },
    orderBy: {
      id: "desc",
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