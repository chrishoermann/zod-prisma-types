import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const JsonModelCreateInputSchema: z.ZodType<PrismaClient.Prisma.JsonModelCreateInput> = z.object({
	json: z.union([  ]),	jsonOpt: z.union([  ]).optional(),}).strict();
