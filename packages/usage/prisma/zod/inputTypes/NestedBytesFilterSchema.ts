import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBytesFilterSchema } from './NestedBytesFilterSchema';

export const NestedBytesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional(),}).strict();
