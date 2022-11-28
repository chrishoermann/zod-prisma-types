import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany();
  console.dir(allUsers, { depth: null });
}
