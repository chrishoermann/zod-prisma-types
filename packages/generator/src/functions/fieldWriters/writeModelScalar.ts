/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { writeFieldAdditions } from '.';
import { WriteFieldOptions } from '../../types';
import { globalConfig } from '../../config';

export const writeScalar = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  const { coerceDate } = globalConfig.getConfig();
  if (field.type === 'DateTime') {
    writer
      .write(`${field.name}: `)
      .conditionalWrite(!coerceDate, `z.${field.zodType}(`)
      .conditionalWrite(coerceDate, `z.coerce.${field.zodType}(`)
      .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
      .write(`)`)
      .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString!);

    writeFieldAdditions({ writer, field, writeOptionalDefaults });
  } else {
    writer
      .write(`${field.name}: `)
      .write(`z.${field.zodType}(`)
      .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
      .write(`)`)
      .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString!);

    writeFieldAdditions({ writer, field, writeOptionalDefaults });
  }
};
