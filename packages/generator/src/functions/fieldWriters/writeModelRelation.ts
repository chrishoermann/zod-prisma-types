import { writeFieldAdditions } from '.';
import { WriteFieldOptions } from '../../types';

// WRITE RELATION
export const writeRelation = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  const isMongoDb = field.generatorConfig.provider === 'mongodb';

  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.name}: `)
    .conditionalWrite(
      !isMongoDb,
      `z.lazy(() => ${field.type}WithRelationsSchema)`,
    )
    .conditionalWrite(isMongoDb, `z.lazy(() => ${field.type}Schema)`);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};
