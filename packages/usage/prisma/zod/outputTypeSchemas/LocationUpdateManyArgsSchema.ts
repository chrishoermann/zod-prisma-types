import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationUpdateManyMutationInputSchema } from '../inputTypeSchemas/LocationUpdateManyMutationInputSchema'
import { LocationUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/LocationUncheckedUpdateManyInputSchema'
import { LocationWhereInputSchema } from '../inputTypeSchemas/LocationWhereInputSchema'

export const LocationUpdateManyArgsSchema: z.ZodType<Prisma.LocationUpdateManyArgs> = z.object({
  data: z.union([ LocationUpdateManyMutationInputSchema,LocationUncheckedUpdateManyInputSchema ]),
  where: LocationWhereInputSchema.optional(),
}).strict()

export default LocationUpdateManyArgsSchema
