import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { UserUncheckedUpdateManyWithoutLocationNestedInputSchema } from './UserUncheckedUpdateManyWithoutLocationNestedInputSchema';

export const LocationUncheckedUpdateInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateInput> = z.object({
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUncheckedUpdateManyWithoutLocationNestedInputSchema).optional(),
}).strict()

export default LocationUncheckedUpdateInputSchema
