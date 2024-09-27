import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 年齢の平均値を集計します。
  const aggregations = await prisma.profile.aggregate({
    _avg: {
      age: true
    }
  });
  console.dir(aggregations, {depth: null});
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