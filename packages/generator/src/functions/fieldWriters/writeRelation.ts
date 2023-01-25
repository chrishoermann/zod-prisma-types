import { writeFieldAdditions } from '.';
import { WriteFieldOptions } from '../../types';

// WRITE RELATION
export const writeRelation = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.name}: `)
    .write(`z.lazy(() => ${field.type}WithRelationsSchema)`);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};
