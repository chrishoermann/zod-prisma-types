import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationCreateManyInputSchema } from '../inputTypeSchemas/LocationCreateManyInputSchema'

export const LocationCreateManyArgsSchema: z.ZodType<Prisma.LocationCreateManyArgs> = z.object({
  data: LocationCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export default LocationCreateManyArgsSchema
