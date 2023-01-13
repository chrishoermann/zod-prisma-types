import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileCreateroleInputSchema } from './ProfileCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { SecondEnumSchema } from './SecondEnumSchema';

export const ProfileCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCreateWithoutUserInput> = z.object({
	bio: z.string(),
	role: z.union([  ]).optional(),	second: }).strict();
