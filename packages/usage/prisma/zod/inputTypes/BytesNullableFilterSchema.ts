import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBytesNullableFilterSchema } from './NestedBytesNullableFilterSchema';

export const BytesNullableFilterSchema: z.ZodType<PrismaClient.Prisma.BytesNullableFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional().nullable(),}).strict();
