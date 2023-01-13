import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';

export const MyPrismaScalarsTypeUncheckedCreateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeUncheckedCreateInput, "exclude">> = z.object({
	id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
	string: z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).optional().nullable(),
	bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
	float: z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),
	floatOpt: z.number().optional().nullable(),
	int: z.number().int({ message: "error" }).gt(5, { message: "gt error" }),
	intOpt: z.number().int().optional().nullable(),
	decimal: 	decimalOpt: 	date: z.date().optional(),
	dateOpt: z.date({ invalid_type_error: "wrong date type" }).optional().nullable(),
	bigIntOpt: z.bigint().optional().nullable(),
	json: z.union([  ]),	jsonOpt: z.union([  ]).optional(),	bytes: 	bytesOpt: 	custom: z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).optional().nullable(),
	// omitted: exclude: z.string().optional().nullable(),
	updatedAt: z.date().optional(),
}).strict();
