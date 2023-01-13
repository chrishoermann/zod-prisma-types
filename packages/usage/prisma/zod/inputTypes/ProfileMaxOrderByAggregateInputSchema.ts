import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';

export const ProfileMaxOrderByAggregateInputSchema: z.ZodType<PrismaClient.Prisma.ProfileMaxOrderByAggregateInput> = z.object({
	id: 	bio: 	userId: 	second: }).strict();
