import { PrismaClient } from '@prisma/client';
import {
  MyModelCreateArgsSchema,
  JsonModelCreateArgsSchema,
  UserFindFirstArgsSchema,
  UserFindManyArgsSchema,
  UserFindUniqueArgsSchema,
} from '../prisma/zod';
import { initTRPC } from '@trpc/server';

const prisma = new PrismaClient();

const t = initTRPC.create();

export const appRouter = t.router({
  findManyUser: t.procedure.input(UserFindManyArgsSchema).query(({ input }) => {
    return prisma.user.findMany(input);
  }),
  findUniqueUser: t.procedure
    .input(UserFindUniqueArgsSchema)
    .query(({ input }) => {
      return prisma.user.findUnique(input);
    }),

  findFirstUser: t.procedure
    .input(UserFindFirstArgsSchema)
    .query(({ input }) => {
      return prisma.user.findFirst(input);
    }),

  createMyModel: t.procedure
    .input(MyModelCreateArgsSchema)
    .query(({ input }) => {
      return prisma.myModel.create({
        ...input,
        data: { ...input.data, omitRequired: 'foo' },
      });
    }),

  createJson: t.procedure
    .input(JsonModelCreateArgsSchema)
    .mutation(({ input }) => {
      return prisma.jsonModel.create(input);
    }),
});

export type AppRouter = typeof appRouter;
