import { z } from 'zod'
import { Prisma } from '@prisma/client'

export const LocationCountOutputTypeSelectSchema: z.ZodType<Prisma.LocationCountOutputTypeSelect> = z.object({{
  User: z.boolean().optional(),
}).strict()

export default LocationCountOutputTypeSelectSchema
