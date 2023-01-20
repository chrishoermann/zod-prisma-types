import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostUpdateanotherEnumInputSchema: z.ZodType<Prisma.PostUpdateanotherEnumInput> = z.object({
  set: z.lazy(() => AnotherEnumSchema).array().optional(),
  push: z.union([ z.lazy(() => AnotherEnumSchema),z.lazy(() => AnotherEnumSchema).array() ]).optional(),
}).strict()

export default PostUpdateanotherEnumInputSchema
