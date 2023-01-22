import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DecimalModelSelectSchema } from '../inputTypeSchemas/DecimalModelSelectSchema'
import { DecimalModelCreateInputSchema } from '../inputTypeSchemas/DecimalModelCreateInputSchema'
import { DecimalModelUncheckedCreateInputSchema } from '../inputTypeSchemas/DecimalModelUncheckedCreateInputSchema'

export const DecimalModelCreateArgsSchema: z.ZodType<Prisma.DecimalModelCreateArgs> = z.object({
  select: DecimalModelSelectSchema.optional(),
  data: z.union([ DecimalModelCreateInputSchema,DecimalModelUncheckedCreateInputSchema ]),
}).strict()

export default DecimalModelCreateArgsSchema
