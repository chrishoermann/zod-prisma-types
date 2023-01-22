import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DecimalModelUpdateManyMutationInputSchema } from '../inputTypeSchemas/DecimalModelUpdateManyMutationInputSchema'
import { DecimalModelUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/DecimalModelUncheckedUpdateManyInputSchema'
import { DecimalModelWhereInputSchema } from '../inputTypeSchemas/DecimalModelWhereInputSchema'

export const DecimalModelUpdateManyArgsSchema: z.ZodType<Prisma.DecimalModelUpdateManyArgs> = z.object({
  data: z.union([ DecimalModelUpdateManyMutationInputSchema,DecimalModelUncheckedUpdateManyInputSchema ]),
  where: DecimalModelWhereInputSchema.optional(),
}).strict()

export default DecimalModelUpdateManyArgsSchema
