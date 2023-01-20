import { z } from 'zod';
import { Prisma } from '@prisma/client';

export const LocationCreateManyInputSchema: z.ZodType<Prisma.LocationCreateManyInput> = z.object({
  lat: z.number(),
  lng: z.number(),
}).strict()

export default LocationCreateManyInputSchema
