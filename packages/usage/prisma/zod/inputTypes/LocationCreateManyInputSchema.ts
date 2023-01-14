import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const LocationCreateManyInputSchema: z.ZodType<PrismaClient.Prisma.LocationCreateManyInput> = z.object({
  lat: z.number(),
  lng: z.number(),
}).strict()