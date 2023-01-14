import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const MODELWithUpperCaseSumOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.MODELWithUpperCaseSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict()