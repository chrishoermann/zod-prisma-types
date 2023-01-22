import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DecimalModelCreateManyInputSchema } from '../inputTypeSchemas/DecimalModelCreateManyInputSchema'

export const DecimalModelCreateManyArgsSchema: z.ZodType<Prisma.DecimalModelCreateManyArgs> = z.object({
  data: DecimalModelCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default DecimalModelCreateManyArgsSchema
