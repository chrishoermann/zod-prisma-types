import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserRelationFilterSchema: z.ZodType<PrismaClient.Prisma.UserRelationFilter> = z.object({
	is: 	isNot: }).strict();
