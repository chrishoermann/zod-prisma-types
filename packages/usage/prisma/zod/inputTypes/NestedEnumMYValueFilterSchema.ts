import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MYValueSchema } from './MYValueSchema';
import { NestedEnumMYValueFilterSchema } from './NestedEnumMYValueFilterSchema';

export const NestedEnumMYValueFilterSchema: z.ZodType<PrismaClient.Prisma.NestedEnumMYValueFilter> = z.object({
	equals: 	in: 	notIn: 	not: z.union([  ]).optional(),}).strict();
