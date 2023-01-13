import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserListRelationFilterSchema: z.ZodType<PrismaClient.Prisma.UserListRelationFilter> = z.object({
	every: 	some: 	none: }).strict();
