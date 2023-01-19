/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { WriteTypeFunction, WriteTypeOptions } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

/**
 * Checks if a type is a special type e.g. Bytes, Deciaml, Json.
 *
 * If yes, it writes the corresponding zod type - if no, it returns undefined.
 *
 * @param writer CodeBlockWriter
 * @param options WriteTypeFunction
 * @returns CodeBlockWriter | undefined
 */
export const writeSpecialType: WriteTypeFunction<WriteTypeOptions> = (
  writer,
  {
    inputType,
    isOptional,
    isNullable,
    writeComma = true,
    zodCustomErrors,
    zodCustomValidatorString,
  },
) => {
  if (!inputType.isSpecialType()) return;

  if (
    zodCustomValidatorString &&
    inputType.generatorConfig.addInputTypeValidation
  ) {
    return writer
      .write(zodCustomValidatorString)
      .conditionalWrite(inputType.isList, `.array()`)
      .conditionalWrite(isOptional, `.optional()`)
      .conditionalWrite(isNullable, `.nullable()`)
      .conditionalWrite(writeComma, `,`);
  }

  if (
    inputType.isDecimalType &&
    !inputType.generatorConfig.useInstanceOfForDecimal
  ) {
    if (inputType.isList) {
      return writer
        .write(`z.union([`)
        .write(`z.number().array(),`)
        .write(`z.string().array(),`)
        .write(`z.instanceof(PrismaClient.Prisma.Decimal).array(),`)
        .write(`DecimalJSLikeSchema.array(),`)
        .write(`]`)
        .conditionalWrite(!!zodCustomErrors, `, ${zodCustomErrors!}`)
        .write(`)`)

        .write(`.refine((v) => `)
        .write(`(v as any[]).every((v) => isValidDecimalInput(v)),`)
        .write(` { message: 'Must be a Decimal' })`)
        .conditionalWrite(isOptional, `.optional()`)
        .conditionalWrite(isNullable, `.nullable()`)
        .conditionalWrite(writeComma, `,`);
    }

    return writer
      .write(`z.union([`)
      .write(`z.number(),`)
      .write(`z.string(),`)
      .write(`z.instanceof(PrismaClient.Prisma.Decimal),`)
      .write(`DecimalJSLikeSchema,`)
      .write(`]`)
      .conditionalWrite(!!zodCustomErrors, `, ${zodCustomErrors!}`)
      .write(`)`)
      .write(`.refine((v) => isValidDecimalInput(v),`)
      .write(` { message: 'Must be a Decimal' })`)
      .conditionalWrite(isOptional, `.optional()`)
      .conditionalWrite(isNullable, `.nullable()`)
      .conditionalWrite(writeComma, `,`);
  }

  if (
    inputType.isDecimalType &&
    inputType.generatorConfig.useInstanceOfForDecimal
  ) {
    return writer
      .write(`z.instanceof(PrismaClient.Prisma.Decimal)`)
      .conditionalWrite(inputType.isList, `.array()`)
      .conditionalWrite(isOptional, `.optional()`)
      .conditionalWrite(isNullable, `.nullable()`)
      .conditionalWrite(writeComma, `,`);
  }

  if (inputType.isJsonType) {
    return writer
      .write(`InputJsonValue`)
      .conditionalWrite(inputType.isList, `.array()`)
      .conditionalWrite(isOptional, `.optional()`)
      .conditionalWrite(isNullable, `.nullable()`)
      .conditionalWrite(writeComma, `,`);
  }

  if (inputType.isBytesType) {
    return writer
      .write(`z.instanceof(Buffer)`)
      .conditionalWrite(inputType.isList, `.array()`)
      .conditionalWrite(isOptional, `.optional()`)
      .conditionalWrite(isNullable, `.nullable()`)
      .conditionalWrite(writeComma, `,`);
  }

  return writer
    .write(`z.null(),`)
    .conditionalWrite(!isOptional, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .conditionalWrite(writeComma, `,`);
};
