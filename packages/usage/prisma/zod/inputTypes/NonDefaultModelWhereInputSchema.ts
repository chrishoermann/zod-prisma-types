import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NonDefaultModelWhereInputSchema } from './NonDefaultModelWhereInputSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';

export const NonDefaultModelWhereInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.number().optional() ]).optional(),	string: z.union([ z.string().optional() ]).optional(),}).strict();
