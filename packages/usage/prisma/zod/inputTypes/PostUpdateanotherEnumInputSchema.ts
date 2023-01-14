import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostUpdateanotherEnumInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateanotherEnumInput> = z.object({
  set: z.lazy(() => AnotherEnumSchema).array().optional(),
  push: z.union([ z.lazy(() => AnotherEnumSchema),z.lazy(() => AnotherEnumSchema).array() ]).optional(),
}).strict()