import * as PrismaClient from '@prisma/client';
import validator from 'validator';
import { z } from "zod";
import { myFunction } from '../../../utils/myFunction';
import { DecimalJSLikeSchema, InputJsonValue, isValidDecimalInput, NullableJsonValue } from "../helpers";

export const MyPrismaScalarsTypeSchema = z.object({
  id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid(),
  /**
   * Some comment about string
   */
  string: z.string().min(3, { message: "min error" }).max(10, { message: "max error" }).nullish(),
  bic: z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }).nullish(),
  float: z.number().lt(10, { message: "lt error" }).gt(5, { message: "gt error" }),
  floatOpt: z.number().nullish(),
  int: z.number().int({ message: "error" }).gt(5, { message: "gt error" }),
  intOpt: z.number().int().nullish(),
  decimal: z.union([z.number(), z.string(), z.instanceof(PrismaClient.Prisma.Decimal), DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Field "decimal" must be a Decimal', path: ['Models', 'MyPrismaScalarsType'] }),
  decimalOpt: z.union([z.number(), z.string(), z.instanceof(PrismaClient.Prisma.Decimal), DecimalJSLikeSchema,]).refine((v) => isValidDecimalInput(v), { message: 'Field "decimalOpt" must be a Decimal', path: ['Models', 'MyPrismaScalarsType'] }).nullish(),
  date: z.date(),
  dateOpt: z.date({ invalid_type_error: "wrong date type" }).nullish(),
  bigIntOpt: z.bigint().nullish(),
  json: z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' }),
  jsonOpt: NullableJsonValue.optional(),
  bytes: z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }),
  bytesOpt: z.instanceof(Buffer).nullish(),
  custom: z.string().refine((val) => myFunction(val), { message: 'Is not valid' }).nullish(),
  // omitted: exclude: z.string().nullish(),
  updatedAt: z.date(),
});

export const MyPrismaScalarsTypeOptionalDefaultsSchema = MyPrismaScalarsTypeSchema.merge(
  z.object({
    id: z.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid().optional(),
    date: z.date().optional(),
    updatedAt: z.date().optional(),
  })
);
