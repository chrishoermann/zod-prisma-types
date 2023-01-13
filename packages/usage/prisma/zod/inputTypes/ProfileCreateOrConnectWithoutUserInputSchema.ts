import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileWhereUniqueInputSchema } from './ProfileWhereUniqueInputSchema';
import { ProfileCreateWithoutUserInputSchema } from './ProfileCreateWithoutUserInputSchema';
import { ProfileUncheckedCreateWithoutUserInputSchema } from './ProfileUncheckedCreateWithoutUserInputSchema';

export const ProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateOrConnectWithoutUserInput> = z.object({
	where: 	create: z.union([  ]),}).strict();
