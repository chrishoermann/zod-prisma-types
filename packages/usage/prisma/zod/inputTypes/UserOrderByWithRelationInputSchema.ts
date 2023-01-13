import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { SortOrderSchema } from './SortOrderSchema';
import { PostOrderByRelationAggregateInputSchema } from './PostOrderByRelationAggregateInputSchema';
import { ProfileOrderByWithRelationInputSchema } from './ProfileOrderByWithRelationInputSchema';
import { LocationOrderByWithRelationInputSchema } from './LocationOrderByWithRelationInputSchema';

export const UserOrderByWithRelationInputSchema: z.ZodType<PrismaClient.Prisma.UserOrderByWithRelationInput> = z.object({
	id: 	email: 	name: 	posts: 	profile: 	role: 	enum: 	scalarList: 	lat: 	lng: 	location: }).strict();
