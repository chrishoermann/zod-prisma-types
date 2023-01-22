import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationSelectSchema } from '../inputTypeSchemas/LocationSelectSchema'
import { LocationIncludeSchema } from '../inputTypeSchemas/LocationIncludeSchema'
import { LocationWhereInputSchema } from '../inputTypeSchemas/LocationWhereInputSchema'
import { LocationOrderByWithRelationInputSchema } from '../inputTypeSchemas/LocationOrderByWithRelationInputSchema'
import { LocationWhereUniqueInputSchema } from '../inputTypeSchemas/LocationWhereUniqueInputSchema'

export const LocationAggregateArgsSchema: z.ZodType<Prisma.LocationAggregateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export default LocationAggregateArgsSchema
