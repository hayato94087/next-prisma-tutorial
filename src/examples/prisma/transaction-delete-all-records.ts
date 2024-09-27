import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const deleteCategory = prisma.category.deleteMany();
  const deletePost = prisma.post.deleteMany();
  const deleteProfile = prisma.profile.deleteMany();
  const deleteUser = prisma.user.deleteMany();

  // シクエンシャルにdeleteManyを実行します。
  const transaction = await prisma.$transaction([deleteCategory, deletePost, deleteProfile, deleteUser])

  console.dir(transaction, {depth: null});
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