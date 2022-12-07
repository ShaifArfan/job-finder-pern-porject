import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function main() {
  if (process.env.NODE_ENV !== 'development') {
    console.log('Not in development mode, exiting...');
    return;
  }

  await prisma.user.deleteMany();

  console.log('Seeding database...');
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
    console.log(user);
  }
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
