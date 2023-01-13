import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const JsonModelUncheckedCreateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelUncheckedCreateInput> = z.object({
	id: z.number().int().optional(),
	json: z.union([  ]),	jsonOpt: z.union([  ]).optional(),}).strict();
