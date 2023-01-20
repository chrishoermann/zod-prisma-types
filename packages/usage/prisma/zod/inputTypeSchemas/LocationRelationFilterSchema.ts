import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationWhereInputSchema } from './LocationWhereInputSchema';

export const LocationRelationFilterSchema: z.ZodType<Prisma.LocationRelationFilter> = z.object({
  is: z.lazy(() => LocationWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => LocationWhereInputSchema).optional().nullable(),
}).strict()

export default LocationRelationFilterSchema
