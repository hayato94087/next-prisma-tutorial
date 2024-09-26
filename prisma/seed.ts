import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function main() {
  // Delete all data
  await prisma.category.deleteMany();
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      password: await bcrypt.hash('alicepass', 10),
      role: Role.USER,
      profile: {
        create: {
          bio: 'Hello, I am Alice!',
          age: 28
        }
      }
    }
  })

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob',
      password: await bcrypt.hash('bobpass', 10),
      role: Role.ADMIN,
      profile: {
        create: {
          bio: 'Hi there, Bob here!',
          age: 32
        }
      }
    }
  })

  // Create categories
  const category1 = await prisma.category.create({
    data: { name: 'Technology' }
  })

  const category2 = await prisma.category.create({
    data: { name: 'Lifestyle' }
  })

  const category3 = await prisma.category.create({
    data: { name: 'Travel' }
  })

  // Create posts
  await prisma.post.create({
    data: {
      title: 'My Journey with Coding',
      content: 'I started learning to code a year ago...',
      published: true,
      author: { connect: { id: alice.id } },
      categories: { connect: [{ id: category1.id }] }
    }
  })

  await prisma.post.create({
    data: {
      title: 'Favorite Hiking Trails',
      content: 'Here are some of my favorite hiking spots...',
      published: true,
      author: { connect: { id: bob.id } },
      categories: { connect: [{ id: category2.id }] }
    }
  })

  await prisma.post.create({
    data: {
      title: 'My Recent Trip to Japan',
      content: 'Last month, I had the opportunity to visit Japan...',
      published: true,
      author: { connect: { id: bob.id } },
      categories: { connect: [{ id: category3.id }, { id: category2.id }] }
    }
  })

  console.log('Seed data created successfully')
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