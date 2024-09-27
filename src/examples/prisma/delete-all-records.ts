import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.deleteMany();
  const post = await prisma.post.deleteMany();
  const profile = await prisma.profile.deleteMany();
  const user = await prisma.user.deleteMany();
  console.dir(category, {depth: null});
  console.dir(post, {depth: null});
  console.dir(profile, {depth: null});
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