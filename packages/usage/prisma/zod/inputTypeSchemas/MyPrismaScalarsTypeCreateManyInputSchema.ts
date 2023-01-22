import { z } from 'zod'
import { Prisma } from '@prisma/client'
import { DecimalJSLikeSchema, isValidDecimalInput } from '.';
import { JsonNullValueInputSchema } from './JsonNullValueInputSchema';
import { InputJsonValue } from './InputJsonValue';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { myFunction } from '../../../utils/myFunction';
import validator from 'validator';

export const MyPrismaScalarsTypeCreateManyInputSchema: z.ZodType<Omit<Prisma.MyPrismaScalarsTypeCreateManyInput, "exclude">> = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
  string: z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).optional().nullable(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).optional().nullable(),
  float: z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),
  floatOpt: z.number().optional().nullable(),
  int: z.number().int({ message: "error" }).gt(5, { message: "gt error" }),
  intOpt: z.number().int().optional().nullable(),
  decimal: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),
  decimalOpt: z.union([z.number(),z.string(),z.instanceof(Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }).optional().nullable(),
  date: z.date().optional(),
  dateOpt: z.date({ invalid_type_error: "wrong date type" }).optional().nullable(),
  bigIntOpt: z.bigint().optional().nullable(),
  json: z.union([ z.lazy(() => JsonNullValueInputSchema),z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' }) ]),
  jsonOpt: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  bytes: z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }),
  bytesOpt: z.instanceof(Buffer).optional().nullable(),
  custom: z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).optional().nullable(),
  // omitted: exclude: z.string().optional().nullable(),
  updatedAt: z.date().optional(),
}).strict()

export default MyPrismaScalarsTypeCreateManyInputSchema
