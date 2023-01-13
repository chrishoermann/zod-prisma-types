import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MyPrismaScalarsTypeWhereInputSchema } from './MyPrismaScalarsTypeWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { FloatFilterSchema } from './FloatFilterSchema';
import { FloatNullableFilterSchema } from './FloatNullableFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';
import { DecimalFilterSchema } from './DecimalFilterSchema';
import { DecimalNullableFilterSchema } from './DecimalNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';
import { BigIntNullableFilterSchema } from './BigIntNullableFilterSchema';
import { JsonFilterSchema } from './JsonFilterSchema';
import { JsonNullableFilterSchema } from './JsonNullableFilterSchema';
import { BytesFilterSchema } from './BytesFilterSchema';
import { BytesNullableFilterSchema } from './BytesNullableFilterSchema';

export const MyPrismaScalarsTypeWhereInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeWhereInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.string().optional() ]).optional(),	string: z.union([ z.string().optional().nullable() ]).optional().nullable(),	bic: z.union([ z.string().optional().nullable() ]).optional().nullable(),	float: z.union([ z.number().optional() ]).optional(),	floatOpt: z.union([ z.number().optional().nullable() ]).optional().nullable(),	int: z.union([ z.number().optional() ]).optional(),	intOpt: z.union([ z.number().optional().nullable() ]).optional().nullable(),	decimal: z.union([  ]).optional(),	decimalOpt: z.union([  ]).optional().nullable(),	date: z.union([ z.date().optional() ]).optional(),	dateOpt: z.union([ z.date().optional().nullable() ]).optional().nullable(),	bigIntOpt: z.union([ z.bigint().optional().nullable() ]).optional().nullable(),	json: 	jsonOpt: 	bytes: z.union([  ]).optional(),	bytesOpt: z.union([  ]).optional().nullable(),	custom: z.union([ z.string().optional().nullable() ]).optional().nullable(),	exclude: z.union([ z.string().optional().nullable() ]).optional().nullable(),	updatedAt: z.union([ z.date().optional() ]).optional(),}).strict();
