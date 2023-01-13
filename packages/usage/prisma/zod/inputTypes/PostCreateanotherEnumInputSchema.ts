import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostCreateanotherEnumInputSchema: z.ZodType<PrismaClient.Prisma.PostCreateanotherEnumInput> = z.object({
	set: }).strict();
