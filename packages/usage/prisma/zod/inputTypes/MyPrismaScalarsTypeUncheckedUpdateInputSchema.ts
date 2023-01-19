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
import { InputJsonValue } from '../helpers';
import { NullableJsonNullValueInputSchema } from './NullableJsonNullValueInputSchema';
import { BytesFieldUpdateOperationsInputSchema } from './BytesFieldUpdateOperationsInputSchema';
import { NullableBytesFieldUpdateOperationsInputSchema } from './NullableBytesFieldUpdateOperationsInputSchema';

export const MyPrismaScalarsTypeUncheckedUpdateInputSchema: z.ZodType<Omit<PrismaClient.Prisma.MyPrismaScalarsTypeUncheckedUpdateInput, "exclude">> = z.object({
  id: z.union([ z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  string: z.union([ z.string().min(3, { message: "min error" }).max(10, { message: "max error" }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bic: z.union([ z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  float: z.union([ z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  floatOpt: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  int: z.union([ z.number().int({ message: "error" }).gt(5, { message: "gt error" }),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  intOpt: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  decimal: z.union([ z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => DecimalFieldUpdateOperationsInputSchema) ]).optional(),
  decimalOpt: z.union([ z.union([z.number(),z.string(),z.instanceof(PrismaClient.Prisma.Decimal),DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' }),z.lazy(() => NullableDecimalFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  dateOpt: z.union([ z.date({ invalid_type_error: "wrong date type" }),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bigIntOpt: z.union([ z.bigint(),z.lazy(() => NullableBigIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  json: z.union([ z.lazy(() => JsonNullValueInputSchema),z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' }) ]).optional(),
  jsonOpt: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValue ]).optional(),
  bytes: z.union([ z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }),z.lazy(() => BytesFieldUpdateOperationsInputSchema) ]).optional(),
  bytesOpt: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  custom: z.union([ z.string().refine((val) => myFunction(val), { message: 'Is not valid' }),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  // omitted: exclude: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict()