import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { WithDefaultValidatorsCreateManyInputSchema } from '../inputTypeSchemas/WithDefaultValidatorsCreateManyInputSchema'

export const WithDefaultValidatorsCreateManyArgsSchema: z.ZodType<Prisma.WithDefaultValidatorsCreateManyArgs> = z.object({
  data: WithDefaultValidatorsCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default WithDefaultValidatorsCreateManyArgsSchema
