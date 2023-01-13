import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { RoleSchema } from './RoleSchema';

export const UserUpdateroleInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdateroleInput> = z.object({
	set: 	push: z.union([  ]).optional(),}).strict();