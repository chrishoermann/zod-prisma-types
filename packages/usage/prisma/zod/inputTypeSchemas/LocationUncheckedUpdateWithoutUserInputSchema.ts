import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';

export const LocationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutUserInput> = z.object({
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()

export default LocationUncheckedUpdateWithoutUserInputSchema
