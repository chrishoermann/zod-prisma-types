import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { UserUncheckedCreateNestedManyWithoutLocationInputSchema } from './UserUncheckedCreateNestedManyWithoutLocationInputSchema';

export const LocationUncheckedCreateInputSchema: z.ZodType<Prisma.LocationUncheckedCreateInput> = z.object({
  lat: z.number(),
  lng: z.number(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutLocationInputSchema).optional(),
}).strict()

export default LocationUncheckedCreateInputSchema
