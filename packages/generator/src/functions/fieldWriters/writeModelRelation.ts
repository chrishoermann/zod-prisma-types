import { writeFieldAdditions } from '.';
import { WriteFieldOptions } from '../../types';

// WRITE RELATION
export const writeRelation = ({
  writer,
  field,
  writeOptionalDefaults = false,
  isPartial = false,
  isOptionalDefaults = false,
}: WriteFieldOptions & {
  isPartial?: boolean;
  isOptionalDefaults?: boolean;
}) => {
  const isMongoDb = field.generatorConfig.provider === 'mongodb';

  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.name}: `)
    .conditionalWrite(
      !isMongoDb && !isPartial && !isOptionalDefaults,
      `z.lazy(() => ${field.type}WithRelationsSchema)`,
    )

    // if `isPartial` i `true`  we need to use `[ModelName]PartialWithRelationsSchema`
    // instead of`[ModelName]WithRelationsSchema` since this model is a model where all
    // fields are optional.

    .conditionalWrite(
      !isMongoDb && isPartial,
      `z.lazy(() => ${field.type}PartialWithRelationsSchema)`,
    )
    .conditionalWrite(
      !isMongoDb && isOptionalDefaults,
      `z.lazy(() => ${field.type}OptionalDefaultsWithRelationsSchema)`,
    )
    .conditionalWrite(isMongoDb, `z.lazy(() => ${field.type}Schema)`);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};
