import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationSelectSchema } from '../inputTypeSchemas/LocationSelectSchema'
import { LocationIncludeSchema } from '../inputTypeSchemas/LocationIncludeSchema'
import { LocationWhereUniqueInputSchema } from '../inputTypeSchemas/LocationWhereUniqueInputSchema'
import { LocationCreateInputSchema } from '../inputTypeSchemas/LocationCreateInputSchema'
import { LocationUncheckedCreateInputSchema } from '../inputTypeSchemas/LocationUncheckedCreateInputSchema'
import { LocationUpdateInputSchema } from '../inputTypeSchemas/LocationUpdateInputSchema'
import { LocationUncheckedUpdateInputSchema } from '../inputTypeSchemas/LocationUncheckedUpdateInputSchema'

export const LocationUpsertArgsSchema: z.ZodType<Prisma.LocationUpsertArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
  create: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
  update: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
}).strict()

export default LocationUpsertArgsSchema
