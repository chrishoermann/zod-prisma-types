import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ModelWithOmitFieldsOrderByWithRelationInputSchema: z.ZodType<Prisma.ModelWithOmitFieldsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default ModelWithOmitFieldsOrderByWithRelationInputSchema