import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NonDefaultModelCreateManyInputSchema } from '../inputTypeSchemas/NonDefaultModelCreateManyInputSchema'

export const NonDefaultModelCreateManyArgsSchema: z.ZodType<Prisma.NonDefaultModelCreateManyArgs> = z.object({
  data: NonDefaultModelCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default NonDefaultModelCreateManyArgsSchema
