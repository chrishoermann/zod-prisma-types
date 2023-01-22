import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DecimalModelSelectSchema } from '../inputTypeSchemas/DecimalModelSelectSchema'
import { DecimalModelWhereInputSchema } from '../inputTypeSchemas/DecimalModelWhereInputSchema'
import { DecimalModelOrderByWithAggregationInputSchema } from '../inputTypeSchemas/DecimalModelOrderByWithAggregationInputSchema'
import { DecimalModelScalarFieldEnumSchema } from '../inputTypeSchemas/DecimalModelScalarFieldEnumSchema'
import { DecimalModelScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/DecimalModelScalarWhereWithAggregatesInputSchema'

export const DecimalModelGroupByArgsSchema: z.ZodType<Prisma.DecimalModelGroupByArgs> = z.object({
  select: DecimalModelSelectSchema.optional(),
  where: DecimalModelWhereInputSchema.optional(),
  orderBy: z.union([ DecimalModelOrderByWithAggregationInputSchema.array(),DecimalModelOrderByWithAggregationInputSchema ]).optional(),
  by: DecimalModelScalarFieldEnumSchema.array(),
  having: DecimalModelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default DecimalModelGroupByArgsSchema
