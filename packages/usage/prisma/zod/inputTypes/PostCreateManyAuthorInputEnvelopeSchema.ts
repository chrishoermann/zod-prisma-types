import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { PostCreateManyAuthorInputSchema } from './PostCreateManyAuthorInputSchema';

export const PostCreateManyAuthorInputEnvelopeSchema: z.ZodType<PrismaClient.Prisma.PostCreateManyAuthorInputEnvelope> = z.object({
	data: 	skipDuplicates: z.boolean().optional(),
}).strict();
