import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const LocationLatLngCompoundUniqueInputSchema: z.ZodType<Prisma.LocationLatLngCompoundUniqueInput> = z.object({
  lat: z.number(),
  lng: z.number(),
}).strict()

export default LocationLatLngCompoundUniqueInputSchema
