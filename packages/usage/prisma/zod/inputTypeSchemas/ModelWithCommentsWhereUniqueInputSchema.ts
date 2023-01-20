import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const ModelWithCommentsWhereUniqueInputSchema: z.ZodType<Prisma.ModelWithCommentsWhereUniqueInput> = z.object({
  id: z.string().optional(),
}).strict()

export default ModelWithCommentsWhereUniqueInputSchema
