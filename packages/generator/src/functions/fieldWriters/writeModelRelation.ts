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
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.name}: `)
    .write(`z.lazy(() => ${field.type}`)
    // if `isPartial` is `true`  we need to use `[ModelName]PartialWithRelationsSchema`
    // instead of`[ModelName]WithRelationsSchema` since this model is a model where all
    // fields are optional.
    .conditionalWrite(isPartial, 'Partial')
    .conditionalWrite(isOptionalDefaults, 'OptionalDefaults')
    .conditionalWrite(!field.isCompositeType, 'WithRelations')
    .write('Schema)');
  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};
