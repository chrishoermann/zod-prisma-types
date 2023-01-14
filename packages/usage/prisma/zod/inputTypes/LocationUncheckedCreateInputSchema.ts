import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserUncheckedCreateNestedManyWithoutLocationInputSchema } from './UserUncheckedCreateNestedManyWithoutLocationInputSchema';

export const LocationUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.LocationUncheckedCreateInput> = z.object({
  lat: z.number(),
  lng: z.number(),
  User: z.lazy(() => UserUncheckedCreateNestedManyWithoutLocationInputSchema).optional(),
}).strict()