import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NonDefaultModelSelectSchema } from '../inputTypeSchemas/NonDefaultModelSelectSchema'
import { NonDefaultModelWhereInputSchema } from '../inputTypeSchemas/NonDefaultModelWhereInputSchema'
import { NonDefaultModelOrderByWithRelationInputSchema } from '../inputTypeSchemas/NonDefaultModelOrderByWithRelationInputSchema'
import { NonDefaultModelWhereUniqueInputSchema } from '../inputTypeSchemas/NonDefaultModelWhereUniqueInputSchema'
import { NonDefaultModelScalarFieldEnumSchema } from '../inputTypeSchemas/NonDefaultModelScalarFieldEnumSchema'

export const NonDefaultModelFindFirstArgsSchema: z.ZodType<Prisma.NonDefaultModelFindFirstArgs> = z.object({
  select: NonDefaultModelSelectSchema.optional(),
  where: NonDefaultModelWhereInputSchema.optional(),
  orderBy: z.union([ NonDefaultModelOrderByWithRelationInputSchema.array(),NonDefaultModelOrderByWithRelationInputSchema ]).optional(),
  cursor: NonDefaultModelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NonDefaultModelScalarFieldEnumSchema.array().optional(),
}).strict()

export default NonDefaultModelFindFirstArgsSchema
