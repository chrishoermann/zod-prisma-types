import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from '../enums';

export const JsonModelOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  json: z.lazy(() => SortOrderSchema).optional(),
  jsonOpt: z.lazy(() => SortOrderSchema).optional(),
}).strict()