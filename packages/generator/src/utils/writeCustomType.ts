/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { WriteTypeFunction } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

/**
 * Checks if a type is a null type.
 *
 * If yes, it writes the corresponding zod type - if no, it returns undefined.
 *
 * @param writer CodeBlockWriter
 * @param options WriteTypeFunction
 * @returns CodeBlockWriter | undefined
 */
export const writeCustomType: WriteTypeFunction = (
  writer,
  { inputType, isOptional: isRequired, isNullable, writeComma = true },
) => {
  const nullType = inputType.getZodNullType();
  if (!nullType) return;

  return writer
    .write(`z.${nullType}(),`)
    .conditionalWrite(!isRequired, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .conditionalWrite(writeComma, `,`);
};
