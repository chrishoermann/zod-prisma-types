import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';

export const LocationUncheckedUpdateManyInputSchema: z.ZodType<PrismaClient.Prisma.LocationUncheckedUpdateManyInput> = z.object({
  lat: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  lng: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()