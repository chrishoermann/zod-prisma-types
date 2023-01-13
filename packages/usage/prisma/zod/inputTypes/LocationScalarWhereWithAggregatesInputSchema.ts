import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { LocationScalarWhereWithAggregatesInputSchema } from './LocationScalarWhereWithAggregatesInputSchema';
import { FloatWithAggregatesFilterSchema } from './FloatWithAggregatesFilterSchema';

export const LocationScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.LocationScalarWhereWithAggregatesInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	lat: z.union([ z.number().optional() ]).optional(),	lng: z.union([ z.number().optional() ]).optional(),}).strict();
