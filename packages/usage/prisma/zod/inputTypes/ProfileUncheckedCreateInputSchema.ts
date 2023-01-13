import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ProfileCreateroleInputSchema } from './ProfileCreateroleInputSchema';
import { RoleSchema } from './RoleSchema';
import { SecondEnumSchema } from './SecondEnumSchema';

export const ProfileUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUncheckedCreateInput> = z.object({
	id: z.number().int().optional(),
	bio: z.string(),
	userId: z.string(),
	role: z.union([  ]).optional(),	second: }).strict();
