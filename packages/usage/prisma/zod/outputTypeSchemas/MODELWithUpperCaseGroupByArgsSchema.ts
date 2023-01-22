import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MODELWithUpperCaseSelectSchema } from '../inputTypeSchemas/MODELWithUpperCaseSelectSchema'
import { MODELWithUpperCaseWhereInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseWhereInputSchema'
import { MODELWithUpperCaseOrderByWithAggregationInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseOrderByWithAggregationInputSchema'
import { MODELWithUpperCaseScalarFieldEnumSchema } from '../inputTypeSchemas/MODELWithUpperCaseScalarFieldEnumSchema'
import { MODELWithUpperCaseScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseScalarWhereWithAggregatesInputSchema'

export const MODELWithUpperCaseGroupByArgsSchema: z.ZodType<Prisma.MODELWithUpperCaseGroupByArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereInputSchema.optional(),
  orderBy: z.union([ MODELWithUpperCaseOrderByWithAggregationInputSchema.array(),MODELWithUpperCaseOrderByWithAggregationInputSchema ]).optional(),
  by: MODELWithUpperCaseScalarFieldEnumSchema.array(),
  having: MODELWithUpperCaseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default MODELWithUpperCaseGroupByArgsSchema
