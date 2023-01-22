import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationSelectSchema } from '../inputTypeSchemas/LocationSelectSchema'
import { LocationIncludeSchema } from '../inputTypeSchemas/LocationIncludeSchema'
import { LocationWhereInputSchema } from '../inputTypeSchemas/LocationWhereInputSchema'
import { LocationOrderByWithRelationInputSchema } from '../inputTypeSchemas/LocationOrderByWithRelationInputSchema'
import { LocationWhereUniqueInputSchema } from '../inputTypeSchemas/LocationWhereUniqueInputSchema'
import { LocationScalarFieldEnumSchema } from '../inputTypeSchemas/LocationScalarFieldEnumSchema'

export const LocationFindManyArgsSchema: z.ZodType<Prisma.LocationFindManyArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: LocationScalarFieldEnumSchema.array().optional(),
}).strict()

export default LocationFindManyArgsSchema
