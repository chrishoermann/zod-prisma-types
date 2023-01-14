import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MODELWithUpperCaseWhereInputSchema } from './MODELWithUpperCaseWhereInputSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { EnumMYValueFilterSchema } from './EnumMYValueFilterSchema';
import { MYValueSchema } from './MYValueSchema';

export const MODELWithUpperCaseWhereInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MODELWithUpperCaseWhereInputSchema),z.lazy(() => MODELWithUpperCaseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MODELWithUpperCaseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MODELWithUpperCaseWhereInputSchema),z.lazy(() => MODELWithUpperCaseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  STRING: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  MYValue: z.union([ z.lazy(() => EnumMYValueFilterSchema),z.lazy(() => MYValueSchema) ]).optional(),
}).strict()