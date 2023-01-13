import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const ModelWithOmitFieldsWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.ModelWithOmitFieldsWhereUniqueInput> = z.object({
	id: z.string().cuid().optional(),
}).strict();
