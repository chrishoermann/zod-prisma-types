import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostUpdateanotherEnumInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateanotherEnumInput> = z.object({
	set: 	push: z.union([  ]).optional(),}).strict();
