import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function getMarkers() {
  return await prisma.marker.findMany();
}
