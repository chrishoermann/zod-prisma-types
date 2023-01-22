import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { MODELWithUpperCaseSelectSchema } from '../inputTypeSchemas/MODELWithUpperCaseSelectSchema'
import { MODELWithUpperCaseWhereInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseWhereInputSchema'
import { MODELWithUpperCaseOrderByWithRelationInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseOrderByWithRelationInputSchema'
import { MODELWithUpperCaseWhereUniqueInputSchema } from '../inputTypeSchemas/MODELWithUpperCaseWhereUniqueInputSchema'
import { MODELWithUpperCaseScalarFieldEnumSchema } from '../inputTypeSchemas/MODELWithUpperCaseScalarFieldEnumSchema'

export const MODELWithUpperCaseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MODELWithUpperCaseFindFirstOrThrowArgs> = z.object({
  select: MODELWithUpperCaseSelectSchema.optional(),
  where: MODELWithUpperCaseWhereInputSchema.optional(),
  orderBy: z.union([ MODELWithUpperCaseOrderByWithRelationInputSchema.array(),MODELWithUpperCaseOrderByWithRelationInputSchema ]).optional(),
  cursor: MODELWithUpperCaseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: MODELWithUpperCaseScalarFieldEnumSchema.array().optional(),
}).strict()

export default MODELWithUpperCaseFindFirstOrThrowArgsSchema
