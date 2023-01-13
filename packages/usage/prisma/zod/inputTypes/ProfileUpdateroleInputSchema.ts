import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { RoleSchema } from './RoleSchema';

export const ProfileUpdateroleInputSchema: z.ZodType<PrismaClient.Prisma.ProfileUpdateroleInput> = z.object({
	set: 	push: z.union([  ]).optional(),}).strict();
