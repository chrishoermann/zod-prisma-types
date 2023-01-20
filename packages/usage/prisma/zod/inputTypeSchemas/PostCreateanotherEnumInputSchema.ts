import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostCreateanotherEnumInputSchema: z.ZodType<Prisma.PostCreateanotherEnumInput> = z.object({
  set: z.lazy(() => AnotherEnumSchema).array(),
}).strict()

export default PostCreateanotherEnumInputSchema
