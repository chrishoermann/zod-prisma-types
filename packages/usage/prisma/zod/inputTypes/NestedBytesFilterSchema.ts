import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const NestedBytesFilterSchema: z.ZodType<PrismaClient.Prisma.NestedBytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesFilterSchema) ]).optional(),
}).strict()