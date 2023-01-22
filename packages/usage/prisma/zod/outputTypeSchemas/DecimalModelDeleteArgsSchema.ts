import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DecimalModelSelectSchema } from '../inputTypeSchemas/DecimalModelSelectSchema'
import { DecimalModelWhereUniqueInputSchema } from '../inputTypeSchemas/DecimalModelWhereUniqueInputSchema'

export const DecimalModelDeleteArgsSchema: z.ZodType<Prisma.DecimalModelDeleteArgs> = z.object({
  select: DecimalModelSelectSchema.optional(),
  where: DecimalModelWhereUniqueInputSchema,
}).strict()

export default DecimalModelDeleteArgsSchema
