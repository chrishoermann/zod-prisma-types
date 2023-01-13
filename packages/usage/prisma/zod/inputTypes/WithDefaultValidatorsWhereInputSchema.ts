import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { WithDefaultValidatorsWhereInputSchema } from './WithDefaultValidatorsWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';

export const WithDefaultValidatorsWhereInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.string().optional() ]).optional(),	idTwo: z.union([ z.string().optional() ]).optional(),	integer: z.union([ z.number().optional() ]).optional(),}).strict();
