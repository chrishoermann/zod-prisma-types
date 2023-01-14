import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileUpdateWithoutUserInputSchema } from './ProfileUpdateWithoutUserInputSchema';
import { ProfileUncheckedUpdateWithoutUserInputSchema } from './ProfileUncheckedUpdateWithoutUserInputSchema';
import { ProfileCreateWithoutUserInputSchema } from './ProfileCreateWithoutUserInputSchema';
import { ProfileUncheckedCreateWithoutUserInputSchema } from './ProfileUncheckedCreateWithoutUserInputSchema';

export const ProfileUpsertWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]),
}).strict()