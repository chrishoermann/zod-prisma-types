import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBytesFilterSchema } from './NestedBytesFilterSchema';

export const BytesFilterSchema: z.ZodType<PrismaClient.Prisma.BytesFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional(),}).strict();
