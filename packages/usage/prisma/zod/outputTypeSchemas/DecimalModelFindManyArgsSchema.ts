import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { DecimalModelSelectSchema } from '../inputTypeSchemas/DecimalModelSelectSchema'
import { DecimalModelWhereInputSchema } from '../inputTypeSchemas/DecimalModelWhereInputSchema'
import { DecimalModelOrderByWithRelationInputSchema } from '../inputTypeSchemas/DecimalModelOrderByWithRelationInputSchema'
import { DecimalModelWhereUniqueInputSchema } from '../inputTypeSchemas/DecimalModelWhereUniqueInputSchema'
import { DecimalModelScalarFieldEnumSchema } from '../inputTypeSchemas/DecimalModelScalarFieldEnumSchema'

export const DecimalModelFindManyArgsSchema: z.ZodType<Prisma.DecimalModelFindManyArgs> = z.object({
  select: DecimalModelSelectSchema.optional(),
  where: DecimalModelWhereInputSchema.optional(),
  orderBy: z.union([ DecimalModelOrderByWithRelationInputSchema.array(),DecimalModelOrderByWithRelationInputSchema ]).optional(),
  cursor: DecimalModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DecimalModelScalarFieldEnumSchema.array().optional(),
}).strict()

export default DecimalModelFindManyArgsSchema
