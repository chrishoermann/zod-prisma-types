import { writeFieldAdditions } from '.';
import { WriteFieldOptions } from '../../types';

export const writeObject = ({
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
