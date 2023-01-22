import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';

export const LocationUpdateWithoutUserInputSchema: z.ZodType<Prisma.LocationUpdateWithoutUserInput> = z.object({
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()

export default LocationUpdateWithoutUserInputSchema
