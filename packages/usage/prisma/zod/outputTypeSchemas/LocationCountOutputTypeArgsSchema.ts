import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { LocationCountOutputTypeSelectSchema } from './LocationCountOutputTypeSelectSchema'

export const LocationCountOutputTypeArgsSchema: z.ZodType<Prisma.LocationCountOutputTypeArgs> = z.object({{
  select: z.lazy(() => LocationCountOutputTypeSelectSchema).nullish(),
}).strict()

export default LocationCountOutputTypeSelectSchema
