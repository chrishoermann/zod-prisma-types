import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const JsonModelUpdateManyMutationInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelUpdateManyMutationInput> = z.object({
	json: z.union([  ]).optional(),	jsonOpt: z.union([  ]).optional(),}).strict();
