import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { FloatFieldUpdateOperationsInputSchema } from './FloatFieldUpdateOperationsInputSchema';
import { NullableFloatFieldUpdateOperationsInputSchema } from './NullableFloatFieldUpdateOperationsInputSchema';
import { IntFieldUpdateOperationsInputSchema } from './IntFieldUpdateOperationsInputSchema';
import { NullableIntFieldUpdateOperationsInputSchema } from './NullableIntFieldUpdateOperationsInputSchema';
import { DecimalFieldUpdateOperationsInputSchema } from './DecimalFieldUpdateOperationsInputSchema';
import { NullableDecimalFieldUpdateOperationsInputSchema } from './NullableDecimalFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { NullableDateTimeFieldUpdateOperationsInputSchema } from './NullableDateTimeFieldUpdateOperationsInputSchema';
import { NullableBigIntFieldUpdateOperationsInputSchema } from './NullableBigIntFieldUpdateOperationsInputSchema';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { BytesFieldUpdateOperationsInputSchema } from './BytesFieldUpdateOperationsInputSchema';
import { NullableBytesFieldUpdateOperationsInputSchema } from './NullableBytesFieldUpdateOperationsInputSchema';

export const MyPrismaScalarsTypeUncheckedUpdateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeUncheckedUpdateInput, "exclude">> = z.object({
	id: z.union([ z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(), 
 ]).optional(),	string: z.union([ z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).optional().nullable(), 
 ]).optional().nullable(),	bic: z.union([ z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),  ]).optional().nullable(),	float: z.union([ z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }).optional(), 
 ]).optional(),	floatOpt: z.union([ z.number().optional().nullable(), 
 ]).optional().nullable(),	int: z.union([ z.number().int({ message: "error" }).gt(5, { message: "gt error" }).optional(), 
 ]).optional(),	intOpt: z.union([ z.number().int().optional().nullable(), 
 ]).optional().nullable(),	decimal: z.union([  ]).optional(),	decimalOpt: z.union([  ]).optional().nullable(),	date: z.union([ z.date().optional(), 
 ]).optional(),	dateOpt: z.union([ z.date({ invalid_type_error: "wrong date type" }).optional().nullable(), 
 ]).optional().nullable(),	bigIntOpt: z.union([ z.bigint().optional().nullable(), 
 ]).optional().nullable(),	json: z.union([  ]).optional(),	jsonOpt: z.union([  ]).optional(),	bytes: z.union([  ]).optional(),	bytesOpt: z.union([  ]).optional().nullable(),	custom: z.union([ z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).optional().nullable(),  ]).optional().nullable(),	// omitted: exclude: z.union([ z.string().optional().nullable(), 
 ]).optional().nullable(),	updatedAt: z.union([ z.date().optional(), 
 ]).optional(),}).strict();
