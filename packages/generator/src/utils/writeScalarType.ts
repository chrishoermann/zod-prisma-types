/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { WriteTypeFunction } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

/**
 * Checks if a type is a scalar type e.g. string, number, date.
 *
 * If yes, it writes the corresponding zod type - if no, it returns undefined.
 *
 * @param writer CodeBlockWriter
 * @param options WriteTypeFunction
 * @returns CodeBlockWriter | undefined
 */
export const writeScalarType: WriteTypeFunction = (
  writer,
  {
    inputType,
    isOptional,
    isNullable,
    writeComma = true,
    zodCustomErrors,
    zodValidatorString,
    zodCustomValidatorString,
    writeValidation = true,
  },
) => {
  const zodType = inputType.getZodScalarType();
  if (!zodType) return;

  if (zodCustomValidatorString) {
    return (
      writer
        .write(zodCustomValidatorString)
        // .conditionalWrite(!writeValidation, `z.${zodType}()`)
        .conditionalWrite(inputType.isList, `.array()`)
        .conditionalWrite(isOptional, `.optional()`)
        .conditionalWrite(isNullable, `.nullable()`)
        .conditionalWrite(writeComma, `,`)
    );
  }

  return writer
    .write(`z.${zodType}(`)
    .conditionalWrite(writeValidation && !!zodCustomErrors, zodCustomErrors!) // assertion because we know it's not undefined
    .write(`)`)
    .conditionalWrite(
      writeValidation && !!zodValidatorString,
      zodValidatorString!,
    ) // assertion because we know it's not undefined
    .conditionalWrite(inputType.isList, `.array()`)
    .conditionalWrite(isOptional, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .conditionalWrite(writeComma, `,`);
};
