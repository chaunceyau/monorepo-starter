import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.create({
    data: {
      id: '1',
      salt: '0',
      password: 'pass',
      email: 'alice',
    },
  });

  console.log('[PRISMA]: Database seed function has finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
