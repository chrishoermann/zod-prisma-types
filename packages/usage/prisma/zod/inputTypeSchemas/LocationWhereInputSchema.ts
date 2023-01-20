import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { FloatFilterSchema } from './FloatFilterSchema';
import { UserListRelationFilterSchema } from './UserListRelationFilterSchema';

export const LocationWhereInputSchema: z.ZodType<Prisma.LocationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  lat: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  lng: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  User: z.lazy(() => UserListRelationFilterSchema).optional(),
}).strict()

export default LocationWhereInputSchema
