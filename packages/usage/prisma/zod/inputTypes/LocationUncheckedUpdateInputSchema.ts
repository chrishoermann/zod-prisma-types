import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { UserUncheckedUpdateManyWithoutLocationNestedInputSchema } from './UserUncheckedUpdateManyWithoutLocationNestedInputSchema';

export const LocationUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.LocationUncheckedUpdateInput> = z.object({
	lat: z.union([ z.number().optional(), 
 ]).optional(),	lng: z.union([ z.number().optional(), 
 ]).optional(),	User: }).strict();
