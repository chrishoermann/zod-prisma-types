import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const UserUpdatescalarListInputSchema: z.ZodType<PrismaClient.Prisma.UserUpdatescalarListInput> = z.object({
	set: z.string().array().optional(),
	push: z.union([ z.string().optional(), 
z.string().array().optional() ]).optional(),}).strict();