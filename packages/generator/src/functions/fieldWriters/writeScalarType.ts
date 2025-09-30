/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getConfig } from '../../config';
import { WriteTypeFunction } from '../../types';

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
    isTopLevelValidator = false,
  },
) => {
  const zodType = inputType.getZodScalarType();
  if (!zodType) return;

  const { addInputTypeValidation, coerceDate } = getConfig();

  if (zodCustomValidatorString) {
    if (zodType === 'date') {
      return writer
        .conditionalWrite(addInputTypeValidation, zodCustomValidatorString)
        .conditionalWrite(
          !addInputTypeValidation && !coerceDate,
          `z.${zodType}()`,
        )
        .conditionalWrite(
          !addInputTypeValidation && coerceDate,
          `z.coerce.${zodType}()`,
        )
        .conditionalWrite(inputType.isList, `.array()`)
        .conditionalWrite(isOptional, `.optional()`)
        .conditionalWrite(isNullable, `.nullable()`)
        .conditionalWrite(writeComma, `, `);
    }

    // only writes the validator string if the user has not disabled input type validation
    return writer
      .conditionalWrite(addInputTypeValidation, zodCustomValidatorString)
      .conditionalWrite(!addInputTypeValidation, `z.${zodType}()`)
      .conditionalWrite(inputType.isList, `.array()`)
      .conditionalWrite(isOptional, `.optional()`)
      .conditionalWrite(isNullable, `.nullable()`)
      .conditionalWrite(writeComma, `,`);
  }

  if (zodType === 'date') {
    return writer
      .conditionalWrite(!coerceDate, `z.${zodType}(`)
      .conditionalWrite(coerceDate, `z.coerce.${zodType}(`)
      .conditionalWrite(writeValidation && !!zodCustomErrors, zodCustomErrors!)
      .write(`)`)
      .conditionalWrite(
        writeValidation && !!zodValidatorString,
        zodValidatorString!,
      )
      .conditionalWrite(inputType.isList, `.array()`)
      .conditionalWrite(isOptional, `.optional()`)
      .conditionalWrite(isNullable, `.nullable()`)
      .conditionalWrite(writeComma, `,`);
  }

  if (isTopLevelValidator) {
    return writer
      .write(`z`)
      .write(zodValidatorString!)
      .conditionalWrite(inputType.isList, `.array()`)
      .conditionalWrite(isOptional, `.optional()`)
      .conditionalWrite(isNullable, `.nullable()`)
      .conditionalWrite(writeComma, `,`);
  }

  return writer
    .write(`z.${zodType}(`)
    .conditionalWrite(writeValidation && !!zodCustomErrors, zodCustomErrors!)
    .write(`)`)
    .conditionalWrite(
      writeValidation && !!zodValidatorString,
      zodValidatorString!,
    )
    .conditionalWrite(inputType.isList, `.array()`)
    .conditionalWrite(isOptional, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .conditionalWrite(writeComma, `,`);
};
