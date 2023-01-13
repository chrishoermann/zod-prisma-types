import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema } from './ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsScalarWhereWithAggregatesInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.string().optional() ]).optional(),	string: z.union([ z.string().optional().nullable() ]).optional().nullable(),	omitField: z.union([ z.string().optional().nullable() ]).optional().nullable(),	omitRequired: z.union([ z.string().optional() ]).optional(),}).strict();
