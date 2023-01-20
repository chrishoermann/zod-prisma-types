import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelOrderByWithRelationInputSchema: z.ZodType<Prisma.NonDefaultModelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
}).strict()

export default NonDefaultModelOrderByWithRelationInputSchema
