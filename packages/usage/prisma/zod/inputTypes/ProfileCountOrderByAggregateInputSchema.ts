import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ProfileCountOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileCountOrderByAggregateInput> = z.object({
	id: 	bio: 	userId: 	role: 	second: }).strict();
