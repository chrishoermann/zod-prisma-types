import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const WithDefaultValidatorsOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.WithDefaultValidatorsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  idTwo: z.lazy(() => SortOrderSchema).optional(),
  integer: z.lazy(() => SortOrderSchema).optional(),
}).strict()