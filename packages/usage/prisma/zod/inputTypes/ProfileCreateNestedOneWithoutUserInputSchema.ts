import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileCreateWithoutUserInputSchema } from './ProfileCreateWithoutUserInputSchema';
import { ProfileUncheckedCreateWithoutUserInputSchema } from './ProfileUncheckedCreateWithoutUserInputSchema';
import { ProfileCreateOrConnectWithoutUserInputSchema } from './ProfileCreateOrConnectWithoutUserInputSchema';
import { ProfileWhereUniqueInputSchema } from './ProfileWhereUniqueInputSchema';

export const ProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
}).strict()