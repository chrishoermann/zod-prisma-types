import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const MODELWithUpperCaseOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  STRING: z.lazy(() => SortOrderSchema).optional(),
  MYValue: z.lazy(() => SortOrderSchema).optional(),
}).strict()