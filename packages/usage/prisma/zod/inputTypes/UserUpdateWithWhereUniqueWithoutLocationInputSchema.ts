import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateWithoutLocationInputSchema } from './UserUpdateWithoutLocationInputSchema';
import { UserUncheckedUpdateWithoutLocationInputSchema } from './UserUncheckedUpdateWithoutLocationInputSchema';

export const UserUpdateWithWhereUniqueWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutLocationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict()