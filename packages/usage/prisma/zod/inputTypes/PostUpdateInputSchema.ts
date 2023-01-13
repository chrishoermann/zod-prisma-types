import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { BoolFieldUpdateOperationsInputSchema } from './BoolFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutPostsNestedInputSchema } from './UserUpdateOneRequiredWithoutPostsNestedInputSchema';
import { PostUpdateanotherEnumInputSchema } from './PostUpdateanotherEnumInputSchema';
import { AnotherEnumSchema } from './AnotherEnumSchema';

export const PostUpdateInputSchema: z.ZodType<PrismaClient.Prisma.PostUpdateInput> = z.object({
	title: z.union([ z.string().optional(), 
 ]).optional(),	content: z.union([ z.string().optional().nullable(), 
 ]).optional().nullable(),	published: z.union([ z.boolean().optional(), 
 ]).optional(),	author: 	anotherEnum: z.union([  ]).optional(),}).strict();
