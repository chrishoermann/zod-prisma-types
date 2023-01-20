import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { LocationLatLngCompoundUniqueInputSchema } from './LocationLatLngCompoundUniqueInputSchema';

export const LocationWhereUniqueInputSchema: z.ZodType<Prisma.LocationWhereUniqueInput> = z.object({
  lat_lng: z.lazy(() => LocationLatLngCompoundUniqueInputSchema).optional(),
}).strict()

export default LocationWhereUniqueInputSchema
