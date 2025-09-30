/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { writeFieldAdditions } from '.';
import { WriteFieldOptions } from '../../types';
import { getConfig } from '../../config';

export const writeScalar = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  const { coerceDate } = getConfig();
  if (field.type === 'DateTime') {
    writer
      .write(`${field.name}: `)
      .conditionalWrite(!coerceDate, `z.${field.zodType}(`)
      .conditionalWrite(coerceDate, `z.coerce.${field.zodType}(`)
      .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
      .write(`)`)
      .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString!);

    return writeFieldAdditions({ writer, field, writeOptionalDefaults });
  }

  if (field.isTopLevelValidator) {
    writer
      .write(`${field.name}: `)
      .write(`z`)
      .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString!);

    return writeFieldAdditions({ writer, field, writeOptionalDefaults });
  }

  writer
    .write(`${field.name}: `)
    .write(`z.${field.zodType}(`)
    .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
    .write(`)`)
    .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString!);

  return writeFieldAdditions({ writer, field, writeOptionalDefaults });
};
