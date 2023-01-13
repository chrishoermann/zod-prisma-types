import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const PostWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.PostWhereUniqueInput> = z.object({
	id: z.number().int().optional(),
}).strict();
