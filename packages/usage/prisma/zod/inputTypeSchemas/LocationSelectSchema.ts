import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { UserFindManyArgsSchema } from '../outputTypeSchemas/UserFindManyArgsSchema'
import { LocationCountOutputTypeArgsSchema } from '../outputTypeSchemas/LocationCountOutputTypeArgsSchema'

export const LocationSelectSchema: z.ZodType<Prisma.LocationSelect> = z.object({
  lat: z.boolean().optional(),
  lng: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default LocationSelectSchema
