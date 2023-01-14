import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { NestedBytesNullableFilterSchema } from './NestedBytesNullableFilterSchema';

export const BytesNullableFilterSchema: z.ZodType<PrismaClient.Prisma.BytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableFilterSchema) ]).optional().nullable(),
}).strict()