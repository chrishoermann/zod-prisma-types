import { PrismaClient } from '@prisma/client';
import { UserFindManyArgs } from './prisma/zod/inputTypesBase';
import { initTRPC } from '@trpc/server';

const prisma = new PrismaClient();

const t = initTRPC.create();

const appRouter = t.router({
  findManyUser: t.procedure.input(UserFindManyArgs).query(({ input }) => {
    return prisma.user.findMany(input);
  }),
});
