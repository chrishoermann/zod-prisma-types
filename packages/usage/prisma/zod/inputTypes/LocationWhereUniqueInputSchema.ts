import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { LocationLatLngCompoundUniqueInputSchema } from './LocationLatLngCompoundUniqueInputSchema';

export const LocationWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.LocationWhereUniqueInput> = z.object({
	lat_lng: }).strict();
