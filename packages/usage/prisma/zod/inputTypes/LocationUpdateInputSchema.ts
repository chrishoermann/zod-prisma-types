import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { UserUpdateManyWithoutLocationNestedInputSchema } from './UserUpdateManyWithoutLocationNestedInputSchema';

export const LocationUpdateInputSchema: z.ZodType<PrismaClient.Prisma.LocationUpdateInput> = z.object({
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateManyWithoutLocationNestedInputSchema).optional(),
}).strict()