import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { UserFindManyArgsSchema } from '../outputTypeSchemas/UserFindManyArgsSchema'
import { LocationCountOutputTypeArgsSchema } from '../outputTypeSchemas/LocationCountOutputTypeArgsSchema'

export const LocationIncludeSchema: z.ZodType<Prisma.LocationInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export default LocationIncludeSchema
