import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const StringNullableListFilterSchema: z.ZodType<PrismaClient.Prisma.StringNullableListFilter> = z.object({
	equals: z.string().array().optional().nullable(),
	has: z.string().optional().nullable(),
	hasEvery: z.string().array().optional(),
	hasSome: z.string().array().optional(),
	isEmpty: z.boolean().optional(),
}).strict();
