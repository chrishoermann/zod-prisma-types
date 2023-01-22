import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationSelectSchema } from '../inputTypeSchemas/LocationSelectSchema'
import { LocationIncludeSchema } from '../inputTypeSchemas/LocationIncludeSchema'
import { LocationUpdateInputSchema } from '../inputTypeSchemas/LocationUpdateInputSchema'
import { LocationUncheckedUpdateInputSchema } from '../inputTypeSchemas/LocationUncheckedUpdateInputSchema'
import { LocationWhereUniqueInputSchema } from '../inputTypeSchemas/LocationWhereUniqueInputSchema'

export const LocationUpdateArgsSchema: z.ZodType<Prisma.LocationUpdateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
  where: LocationWhereUniqueInputSchema,
}).strict()

export default LocationUpdateArgsSchema
