import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationWhereInputSchema } from '../inputTypeSchemas/LocationWhereInputSchema'

export const LocationDeleteManyArgsSchema: z.ZodType<Prisma.LocationDeleteManyArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
}).strict()

export default LocationDeleteManyArgsSchema
