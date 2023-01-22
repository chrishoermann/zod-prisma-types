import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationSelectSchema } from '../inputTypeSchemas/LocationSelectSchema'
import { LocationIncludeSchema } from '../inputTypeSchemas/LocationIncludeSchema'
import { LocationWhereInputSchema } from '../inputTypeSchemas/LocationWhereInputSchema'
import { LocationOrderByWithAggregationInputSchema } from '../inputTypeSchemas/LocationOrderByWithAggregationInputSchema'
import { LocationScalarFieldEnumSchema } from '../inputTypeSchemas/LocationScalarFieldEnumSchema'
import { LocationScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/LocationScalarWhereWithAggregatesInputSchema'

export const LocationGroupByArgsSchema: z.ZodType<Prisma.LocationGroupByArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithAggregationInputSchema.array(),LocationOrderByWithAggregationInputSchema ]).optional(),
  by: LocationScalarFieldEnumSchema.array(),
  having: LocationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default LocationGroupByArgsSchema
