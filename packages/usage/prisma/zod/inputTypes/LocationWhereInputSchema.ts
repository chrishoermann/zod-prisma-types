import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { LocationWhereInputSchema } from './LocationWhereInputSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { UserListRelationFilterSchema } from './UserListRelationFilterSchema';

export const LocationWhereInputSchema: z.ZodType<PrismaClient.Prisma.LocationWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	lat: z.union([ z.number().optional() ]).optional(),	lng: z.union([ z.number().optional() ]).optional(),	User: }).strict();
