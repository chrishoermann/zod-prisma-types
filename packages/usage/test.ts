import { PrismaClient } from '@prisma/client';
import {
  UserFindFirstArgsSchema,
  UserFindManyArgsSchema,
  UserFindUniqueArgsSchema,
} from './prisma/zod';
import { initTRPC } from '@trpc/server';
import z from 'zod';

const prisma = new PrismaClient();

const t = initTRPC.create();

const appRouter = t.router({
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
});

const schema = z.object({
  title: z.string(),
  content: z.string().nullish(),
  published: z.boolean().optional(),
}) satisfies z.ZodType<Prisma.PostCreateInput>;
