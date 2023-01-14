import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const LocationUncheckedCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationUncheckedCreateWithoutUserInput> = z.object({
  lat: z.number(),
  lng: z.number(),
}).strict()