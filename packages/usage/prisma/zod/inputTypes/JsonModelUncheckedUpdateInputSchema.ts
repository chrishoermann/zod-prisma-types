import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const JsonModelUncheckedUpdateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelUncheckedUpdateInput> = z.object({
	id: z.union([ z.number().int().optional(), 
 ]).optional(),	json: z.union([  ]).optional(),	jsonOpt: z.union([  ]).optional(),}).strict();
