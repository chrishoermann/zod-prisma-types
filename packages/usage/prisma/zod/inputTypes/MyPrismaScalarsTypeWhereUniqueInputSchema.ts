import { z } from 'zod';
import * as PrismaClient from '@prisma/client';

export const MyPrismaScalarsTypeWhereUniqueInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeWhereUniqueInput> = z.object({
	id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
}).strict();
