import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';

export const WithDefaultValidatorsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WithDefaultValidatorsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WithDefaultValidatorsScalarWhereWithAggregatesInputSchema),z.lazy(() => WithDefaultValidatorsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WithDefaultValidatorsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WithDefaultValidatorsScalarWhereWithAggregatesInputSchema),z.lazy(() => WithDefaultValidatorsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  idTwo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  integer: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict()

export default WithDefaultValidatorsScalarWhereWithAggregatesInputSchema
