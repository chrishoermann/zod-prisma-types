import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';

export const ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ModelWithOmitFieldsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema),z.lazy(() => ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema),z.lazy(() => ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  string: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  omitField: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  omitRequired: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict()

export default ModelWithOmitFieldsScalarWhereWithAggregatesInputSchema
