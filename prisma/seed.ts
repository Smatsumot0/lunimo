import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is not set');

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  await prisma.user.upsert({
    where: { id: 'dev-user' },
    update: {},
    create: {
      id: 'dev-user',
      email: 'dev@example.com',
      passwordHash: 'dev', //TODO: ハッシュ化する
    },
  });

  console.log('seeded dev-user');
}

main().finally(async () => {
  await prisma.$disconnect();
});
