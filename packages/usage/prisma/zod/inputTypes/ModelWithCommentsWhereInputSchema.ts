import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ModelWithCommentsWhereInputSchema } from './ModelWithCommentsWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';

export const ModelWithCommentsWhereInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.string().optional() ]).optional(),	string: z.union([ z.string().optional().nullable() ]).optional().nullable(),	omitField: z.union([ z.string().optional().nullable() ]).optional().nullable(),	omitRequired: z.union([ z.string().optional() ]).optional(),}).strict();
