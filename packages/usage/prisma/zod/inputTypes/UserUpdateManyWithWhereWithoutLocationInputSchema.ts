import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserScalarWhereInputSchema } from './UserScalarWhereInputSchema';
import { UserUpdateManyMutationInputSchema } from './UserUpdateManyMutationInputSchema';
import { UserUncheckedUpdateManyWithoutUserInputSchema } from './UserUncheckedUpdateManyWithoutUserInputSchema';

export const UserUpdateManyWithWhereWithoutLocationInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateManyWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict()