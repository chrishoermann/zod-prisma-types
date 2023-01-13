import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { UserOrderByWithRelationInputSchema } from './UserOrderByWithRelationInputSchema';

export const ProfileOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.ProfileOrderByWithRelationInput> = z.object({
	id: 	bio: 	user: 	userId: 	role: 	second: }).strict();
