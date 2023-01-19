import { writeFieldAdditions } from '.';
import { WriteFieldOptions } from '../types';

export const writeScalar = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .write(`z.${field.zodType}(`)
    .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
    .write(`)`)
    .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString!);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};
