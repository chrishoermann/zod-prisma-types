import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DecimalModelSelectSchema } from '../inputTypeSchemas/DecimalModelSelectSchema'
import { DecimalModelWhereUniqueInputSchema } from '../inputTypeSchemas/DecimalModelWhereUniqueInputSchema'
import { DecimalModelCreateInputSchema } from '../inputTypeSchemas/DecimalModelCreateInputSchema'
import { DecimalModelUncheckedCreateInputSchema } from '../inputTypeSchemas/DecimalModelUncheckedCreateInputSchema'
import { DecimalModelUpdateInputSchema } from '../inputTypeSchemas/DecimalModelUpdateInputSchema'
import { DecimalModelUncheckedUpdateInputSchema } from '../inputTypeSchemas/DecimalModelUncheckedUpdateInputSchema'

export const DecimalModelUpsertArgsSchema: z.ZodType<Prisma.DecimalModelUpsertArgs> = z.object({
  select: DecimalModelSelectSchema.optional(),
  where: DecimalModelWhereUniqueInputSchema,
  create: z.union([ DecimalModelCreateInputSchema,DecimalModelUncheckedCreateInputSchema ]),
  update: z.union([ DecimalModelUpdateInputSchema,DecimalModelUncheckedUpdateInputSchema ]),
}).strict()

export default DecimalModelUpsertArgsSchema
