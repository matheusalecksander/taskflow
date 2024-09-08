import { PrismaService } from '../src/infrastructure/database/orms/prisma/prisma.service';

async function seed() {
  const prisma = new PrismaService();

  const dbSeeded = await prisma.users.findUnique({
    where: {
      id: 'e6f57cff-7b1b-40ea-99c6-09b58a9d523b',
    },
  });

  if (dbSeeded) {
    return;
  }

  await prisma.users.create({
    data: {
      id: 'e6f57cff-7b1b-40ea-99c6-09b58a9d523b',
      email: 'admin@admin.com',
      password: 'admin',
      name: 'Admin',
      role: 'MASTER',
    },
  });

  await prisma.$disconnect();
  console.log('Database seed is completed');
}

seed();
