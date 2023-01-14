import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserCreateNestedManyWithoutLocationInputSchema } from './UserCreateNestedManyWithoutLocationInputSchema';

export const LocationCreateInputSchema: z.ZodType<PrismaClient.Prisma.LocationCreateInput> = z.object({
  lat: z.number(),
  lng: z.number(),
  User: z.lazy(() => UserCreateNestedManyWithoutLocationInputSchema).optional(),
}).strict()