import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { JsonModelWhereInputSchema } from './JsonModelWhereInputSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { JsonFilterSchema } from './JsonFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';

export const JsonModelWhereInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.number().optional() ]).optional(),	json: 	jsonOpt: }).strict();
