import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const LocationLatLngCompoundUniqueInputSchema: z.ZodType<PrismaClient.Prisma.LocationLatLngCompoundUniqueInput> = z.object({
	lat: z.number(),
	lng: z.number(),
}).strict();
