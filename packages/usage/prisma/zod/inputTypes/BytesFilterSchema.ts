import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBytesFilterSchema } from './NestedBytesFilterSchema';

export const BytesFilterSchema: z.ZodType<PrismaClient.Prisma.BytesFilter> = z.object({
  equals: z.instanceof(Buffer).optional(),
  in: z.instanceof(Buffer).array().optional(),
  notIn: z.instanceof(Buffer).array().optional(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesFilterSchema) ]).optional(),
}).strict()