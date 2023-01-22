import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DecimalModelSelectSchema } from '../inputTypeSchemas/DecimalModelSelectSchema'
import { DecimalModelUpdateInputSchema } from '../inputTypeSchemas/DecimalModelUpdateInputSchema'
import { DecimalModelUncheckedUpdateInputSchema } from '../inputTypeSchemas/DecimalModelUncheckedUpdateInputSchema'
import { DecimalModelWhereUniqueInputSchema } from '../inputTypeSchemas/DecimalModelWhereUniqueInputSchema'

export const DecimalModelUpdateArgsSchema: z.ZodType<Prisma.DecimalModelUpdateArgs> = z.object({
  select: DecimalModelSelectSchema.optional(),
  data: z.union([ DecimalModelUpdateInputSchema,DecimalModelUncheckedUpdateInputSchema ]),
  where: DecimalModelWhereUniqueInputSchema,
}).strict()

export default DecimalModelUpdateArgsSchema
