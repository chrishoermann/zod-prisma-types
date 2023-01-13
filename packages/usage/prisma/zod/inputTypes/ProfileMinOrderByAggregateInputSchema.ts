import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ProfileMinOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileMinOrderByAggregateInput> = z.object({
	id: 	bio: 	userId: 	second: }).strict();
