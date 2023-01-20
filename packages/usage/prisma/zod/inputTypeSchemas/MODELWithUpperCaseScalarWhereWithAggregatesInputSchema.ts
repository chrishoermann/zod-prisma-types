import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { EnumMYValueWithAggregatesFilterSchema } from './EnumMYValueWithAggregatesFilterSchema';
import { MYValueSchema } from './MYValueSchema';

export const MODELWithUpperCaseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MODELWithUpperCaseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MODELWithUpperCaseScalarWhereWithAggregatesInputSchema),z.lazy(() => MODELWithUpperCaseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MODELWithUpperCaseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MODELWithUpperCaseScalarWhereWithAggregatesInputSchema),z.lazy(() => MODELWithUpperCaseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  STRING: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  MYValue: z.union([ z.lazy(() => EnumMYValueWithAggregatesFilterSchema),z.lazy(() => MYValueSchema) ]).optional(),
}).strict()

export default MODELWithUpperCaseScalarWhereWithAggregatesInputSchema
