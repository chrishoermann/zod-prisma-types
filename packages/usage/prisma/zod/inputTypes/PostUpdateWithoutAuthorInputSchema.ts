import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { PostUpdateanotherEnumInputSchema } from './PostUpdateanotherEnumInputSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostUpdateWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateWithoutAuthorInput> = z.object({
	title: z.union([ z.string().optional(), 
 ]).optional(),	content: z.union([ z.string().optional().nullable(), 
 ]).optional().nullable(),	published: z.union([ z.boolean().optional(), 
 ]).optional(),	anotherEnum: z.union([  ]).optional(),}).strict();
