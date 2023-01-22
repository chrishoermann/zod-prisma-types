import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const LocationCreateWithoutUserInputSchema: z.ZodType<Prisma.LocationCreateWithoutUserInput> = z.object({
  lat: z.number(),
  lng: z.number(),
}).strict()

export default LocationCreateWithoutUserInputSchema
