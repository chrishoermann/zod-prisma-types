import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { PostCreateManyAuthorInputSchema } from './PostCreateManyAuthorInputSchema';

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyAuthorInputEnvelope> = z.object({
  data: z.lazy(() => PostCreateManyAuthorInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default PostCreateManyAuthorInputEnvelopeSchema
