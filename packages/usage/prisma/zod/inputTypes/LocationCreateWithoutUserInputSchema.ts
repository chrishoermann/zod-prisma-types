import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const LocationCreateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationCreateWithoutUserInput> = z.object({
	lat: z.number(),
	lng: z.number(),
}).strict();
