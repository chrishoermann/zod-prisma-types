import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const LocationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutUserInput> = z.object({
  lat: z.number(),
  lng: z.number(),
}).strict()

export default LocationUncheckedCreateWithoutUserInputSchema
