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
export const writeSpecialType: WriteTypeFunction<
  WriteTypeOptions & { useDecimalJS: boolean }
> = (
  writer,
  {
    inputType,
    isOptional,
    isNullable,
    writeComma = true,
    zodCustomErrors,
    zodCustomValidatorString,
    // writeValidation = true,
  },
) => {
  if (!inputType.isSpecialType()) return;

  if (zodCustomValidatorString) {
    return (
      writer
        .write(zodCustomValidatorString)
        // .conditionalWrite(!writeValidation, `z.any()`)
        .conditionalWrite(inputType.isList, `.array()`)
        .conditionalWrite(isOptional, `.optional()`)
        .conditionalWrite(isNullable, `.nullable()`)
        .conditionalWrite(writeComma, `,`)
    );
  }

  if (inputType.isDecimalType && !inputType.generatorConfig.decimalAsNumber) {
    return writer
      .write(`z.number(`)
      .conditionalWrite(!!zodCustomErrors, zodCustomErrors!)
      .write(`).refine((v) => `)
      .conditionalWrite(
        inputType.generatorConfig.useDecimalJs,
        `Decimal.isDecimal(v),`,
      )
      .conditionalWrite(
        !inputType.generatorConfig.useDecimalJs,
        `PrismaClient.Prisma.Decimal.isDecimal(v),`,
      )
      .write(` { message: 'Must be a Decimal' })`)
      .conditionalWrite(inputType.isList, `.array()`)
      .conditionalWrite(isOptional, `.optional()`)
      .conditionalWrite(isNullable, `.nullable()`)
      .conditionalWrite(writeComma, `,`);
  }

  if (inputType.isDecimalType && inputType.generatorConfig.decimalAsNumber) {
    return writer
      .write(`z.number(`)
      .conditionalWrite(!!zodCustomErrors, zodCustomErrors!)
      .write(`)`)
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
