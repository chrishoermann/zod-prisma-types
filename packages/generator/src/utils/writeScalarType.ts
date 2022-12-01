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
  },
) => {
  const zodType = inputType.getZodScalarType();
  if (!zodType) return;

  return writer
    .write(`z.${zodType}(`)
    .conditionalWrite(!!zodCustomErrors, zodCustomErrors!) // assertion because we know it's not undefined
    .write(`)`)
    .conditionalWrite(!!zodValidatorString, zodValidatorString!) // assertion because we know it's not undefined
    .conditionalWrite(inputType.isList, `.array()`)
    .conditionalWrite(isOptional, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .conditionalWrite(writeComma, `,`);
};
