import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBytesNullableFilterSchema } from './NestedBytesNullableFilterSchema';

export const NestedBytesNullableFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesNullableFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional().nullable(),}).strict();
