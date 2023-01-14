import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const ModelWithOmitFieldsOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  string: z.lazy(() => SortOrderSchema).optional(),
  omitField: z.lazy(() => SortOrderSchema).optional(),
  omitRequired: z.lazy(() => SortOrderSchema).optional(),
}).strict()