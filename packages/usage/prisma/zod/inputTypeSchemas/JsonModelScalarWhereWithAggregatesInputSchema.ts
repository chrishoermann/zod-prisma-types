import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { JsonWithAggregatesFilterSchema } from './JsonWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';

export const JsonModelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JsonModelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => JsonModelScalarWhereWithAggregatesInputSchema),z.lazy(() => JsonModelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JsonModelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JsonModelScalarWhereWithAggregatesInputSchema),z.lazy(() => JsonModelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  json: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  jsonOpt: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
}).strict()

export default JsonModelScalarWhereWithAggregatesInputSchema
