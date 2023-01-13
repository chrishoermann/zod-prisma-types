import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';

export const LocationUpdateWithoutUserInputSchema: z.ZodType<PrismaClient.Prisma.LocationUpdateWithoutUserInput> = z.object({
	lat: z.union([ z.number().optional(), 
 ]).optional(),	lng: z.union([ z.number().optional(), 
 ]).optional(),}).strict();
