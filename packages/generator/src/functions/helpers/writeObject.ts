import { WriteFieldOptions } from '../../types';
import { writeFieldAdditions } from '.';

export const writeRelation = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .write(`z.lazy(() => ${field.zodType}Schema)`);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};
