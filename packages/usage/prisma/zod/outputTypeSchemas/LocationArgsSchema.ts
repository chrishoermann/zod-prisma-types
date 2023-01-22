import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { LocationSelectSchema } from '../inputTypeSchemas/LocationSelectSchema'
import { LocationIncludeSchema } from '../inputTypeSchemas/LocationIncludeSchema'

export const LocationArgsSchema: z.ZodType<Prisma.LocationArgs> = z.object({
  select: z.lazy(() => LocationSelectSchema).optional(),
  include: z.lazy(() => LocationIncludeSchema).optional(),
}).strict()

export default LocationSelectSchema
