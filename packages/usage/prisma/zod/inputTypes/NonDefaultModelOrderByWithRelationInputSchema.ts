import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const NonDefaultModelOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
}).strict()