import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { PostUpdateanotherEnumInputSchema } from './PostUpdateanotherEnumInputSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<PrismaClient.Prisma.PostUncheckedUpdateWithoutAuthorInput> = z.object({
	id: z.union([ z.number().optional(), 
 ]).optional(),	title: z.union([ z.string().optional(), 
 ]).optional(),	content: z.union([ z.string().optional().nullable(), 
 ]).optional().nullable(),	published: z.union([ z.boolean().optional(), 
 ]).optional(),	anotherEnum: z.union([  ]).optional(),}).strict();
