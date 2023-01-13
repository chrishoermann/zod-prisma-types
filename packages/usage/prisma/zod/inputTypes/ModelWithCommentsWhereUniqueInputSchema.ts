import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const ModelWithCommentsWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithCommentsWhereUniqueInput> = z.object({
	id: z.string().uuid().optional(),
}).strict();
