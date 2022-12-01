import { PrismaClient } from '@prisma/client';
import {
  UserFindFirstArgs,
  UserFindManyArgs,
  UserFindUniqueArgs,
} from './prisma/zod/inputTypesBase';
import { initTRPC } from '@trpc/server';

const prisma = new PrismaClient();

const t = initTRPC.create();

const appRouter = t.router({
  findManyUser: t.procedure.input(UserFindManyArgs).query(({ input }) => {
    return prisma.user.findMany(input);
  }),
  findUniqueUser: t.procedure.input(UserFindUniqueArgs).query(({ input }) => {
    return prisma.user.findUnique(input);
  }),

  findFirstUser: t.procedure.input(UserFindFirstArgs).query(({ input }) => {
    return prisma.user.findFirst(input);
  }),
});
