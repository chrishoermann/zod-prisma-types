import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MODELWithUpperCaseWhereInputSchema } from './MODELWithUpperCaseWhereInputSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumMYValueFilterSchema } from './EnumMYValueFilterSchema';
import { MYValueSchema } from './MYValueSchema';

export const MODELWithUpperCaseWhereInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.number().optional() ]).optional(),	STRING: z.union([ z.string().optional() ]).optional(),	MYValue: z.union([  ]).optional(),}).strict();
