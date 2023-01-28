import { WriteFieldOptions } from '../../types';

/**
 * Writes all relevant additional zod modifiers like`.nullish().array().optional()` to a field
 */
export const writeFieldAdditions = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  writer
    .conditionalWrite(field.isList, `.array()`)
    .conditionalWrite(
      field.isNullable && !field.isOptionalOnDefaultValue,
      `.nullish()`,
    )
    .conditionalWrite(
      writeOptionalDefaults && field.isOptionalOnDefaultValue,
      `.optional()`,
    )
    .write(`,`)
    .newLine();
};
