import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserUpdateWithoutProfileInputSchema } from './UserUpdateWithoutProfileInputSchema';
import { UserUncheckedUpdateWithoutProfileInputSchema } from './UserUncheckedUpdateWithoutProfileInputSchema';
import { UserCreateWithoutProfileInputSchema } from './UserCreateWithoutProfileInputSchema';
import { UserUncheckedCreateWithoutProfileInputSchema } from './UserUncheckedCreateWithoutProfileInputSchema';

export const UserUpsertWithoutProfileInputSchema: z.ZodType<PrismaClient.Prisma.UserUpsertWithoutProfileInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
}).strict()