import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MODELWithUpperCaseScalarWhereWithAggregatesInputSchema } from './MODELWithUpperCaseScalarWhereWithAggregatesInputSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumMYValueWithAggregatesFilterSchema } from './EnumMYValueWithAggregatesFilterSchema';
import { MYValueSchema } from './MYValueSchema';

export const MODELWithUpperCaseScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseScalarWhereWithAggregatesInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.number().optional() ]).optional(),	STRING: z.union([ z.string().optional() ]).optional(),	MYValue: z.union([  ]).optional(),}).strict();
