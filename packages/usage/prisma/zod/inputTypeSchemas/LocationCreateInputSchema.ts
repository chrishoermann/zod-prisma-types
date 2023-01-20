import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedManyWithoutLocationInputSchema } from './UserCreateNestedManyWithoutLocationInputSchema';

export const LocationCreateInputSchema: z.ZodType<Prisma.LocationCreateInput> = z.object({
  lat: z.number(),
  lng: z.number(),
  User: z.lazy(() => UserCreateNestedManyWithoutLocationInputSchema).optional(),
}).strict()

export default LocationCreateInputSchema
