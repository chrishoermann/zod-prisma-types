import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import { MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema } from './MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { StringNullableWithAggregatesFilterSchema } from './StringNullableWithAggregatesFilterSchema';
import { FloatWithAggregatesFilterSchema } from './FloatWithAggregatesFilterSchema';
import { FloatNullableWithAggregatesFilterSchema } from './FloatNullableWithAggregatesFilterSchema';
import { IntWithAggregatesFilterSchema } from './IntWithAggregatesFilterSchema';
import { IntNullableWithAggregatesFilterSchema } from './IntNullableWithAggregatesFilterSchema';
import { DecimalWithAggregatesFilterSchema } from './DecimalWithAggregatesFilterSchema';
import { DecimalNullableWithAggregatesFilterSchema } from './DecimalNullableWithAggregatesFilterSchema';
import { DateTimeWithAggregatesFilterSchema } from './DateTimeWithAggregatesFilterSchema';
import { DateTimeNullableWithAggregatesFilterSchema } from './DateTimeNullableWithAggregatesFilterSchema';
import { BigIntNullableWithAggregatesFilterSchema } from './BigIntNullableWithAggregatesFilterSchema';
import { JsonWithAggregatesFilterSchema } from './JsonWithAggregatesFilterSchema';
import { JsonNullableWithAggregatesFilterSchema } from './JsonNullableWithAggregatesFilterSchema';
import { BytesWithAggregatesFilterSchema } from './BytesWithAggregatesFilterSchema';
import { BytesNullableWithAggregatesFilterSchema } from './BytesNullableWithAggregatesFilterSchema';

export const MyPrismaScalarsTypeScalarWhereWithAggregatesInputSchema: z.ZodType<PrismaClient.Prisma.MyPrismaScalarsTypeScalarWhereWithAggregatesInput> = z.object({
	AND: z.union([  ]).optional(),	OR: 	NOT: z.union([  ]).optional(),	id: z.union([ z.string().optional() ]).optional(),	string: z.union([ z.string().optional().nullable() ]).optional().nullable(),	bic: z.union([ z.string().optional().nullable() ]).optional().nullable(),	float: z.union([ z.number().optional() ]).optional(),	floatOpt: z.union([ z.number().optional().nullable() ]).optional().nullable(),	int: z.union([ z.number().optional() ]).optional(),	intOpt: z.union([ z.number().optional().nullable() ]).optional().nullable(),	decimal: z.union([  ]).optional(),	decimalOpt: z.union([  ]).optional().nullable(),	date: z.union([ z.date().optional() ]).optional(),	dateOpt: z.union([ z.date().optional().nullable() ]).optional().nullable(),	bigIntOpt: z.union([ z.bigint().optional().nullable() ]).optional().nullable(),	json: 	jsonOpt: 	bytes: z.union([  ]).optional(),	bytesOpt: z.union([  ]).optional().nullable(),	custom: z.union([ z.string().optional().nullable() ]).optional().nullable(),	exclude: z.union([ z.string().optional().nullable() ]).optional().nullable(),	updatedAt: z.union([ z.date().optional() ]).optional(),}).strict();
