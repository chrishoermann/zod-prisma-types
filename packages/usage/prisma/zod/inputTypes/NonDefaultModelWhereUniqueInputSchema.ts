import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const NonDefaultModelWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.NonDefaultModelWhereUniqueInput> = z.object({
	id: z.number().int().optional(),
}).strict();
