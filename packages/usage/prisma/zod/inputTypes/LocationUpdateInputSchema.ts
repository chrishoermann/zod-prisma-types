import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { UserUpdateManyWithoutLocationNestedInputSchema } from './UserUpdateManyWithoutLocationNestedInputSchema';

export const LocationUpdateInputSchema: z.ZodType<PrismaClient.Prisma.LocationUpdateInput> = z.object({
	lat: z.union([ z.number().optional(), 
 ]).optional(),	lng: z.union([ z.number().optional(), 
 ]).optional(),	User: }).strict();
