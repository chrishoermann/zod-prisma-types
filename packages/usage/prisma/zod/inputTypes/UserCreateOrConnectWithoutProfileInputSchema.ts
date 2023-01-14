import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutProfileInputSchema } from './UserCreateWithoutProfileInputSchema';
import { UserUncheckedCreateWithoutProfileInputSchema } from './UserUncheckedCreateWithoutProfileInputSchema';

export const UserCreateOrConnectWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
}).strict()