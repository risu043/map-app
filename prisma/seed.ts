import { PrismaClient } from '@prisma/client';
import { markers } from './seed/markers';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.marker.createMany({
    data: markers,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
