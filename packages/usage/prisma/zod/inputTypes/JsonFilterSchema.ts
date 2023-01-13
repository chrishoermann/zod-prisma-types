import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { JsonNullValueFilterSchema } from './JsonNullValueFilterSchema';

export const JsonFilterSchema: z.ZodType<PrismaClient.Prisma.JsonFilter> = z.object({
	equals: z.union([  ]).optional(),	path: z.string().array().optional(),
	string_contains: z.string().optional(),
	string_starts_with: z.string().optional(),
	string_ends_with: z.string().optional(),
	array_contains: 	array_starts_with: 	array_ends_with: 	lt: 	lte: 	gt: 	gte: 	not: z.union([  ]).optional(),}).strict();
