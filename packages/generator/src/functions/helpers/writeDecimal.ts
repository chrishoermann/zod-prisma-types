import { writeFieldAdditions } from '.';
import { ExtendedWriteFieldOptions } from '../../types';

export const writeDecimal = ({
  writer,
  field,
  model,
  writeOptionalDefaults = false,
}: ExtendedWriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .write(`z.number(`)
    .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
    .write(`)`)
    .write(`.refine((v) => `)
    .write(`PrismaClient.Prisma.Decimal.isDecimal(v),`)
    .write(
      ` { message: 'Field "${field.formattedNames.original}" must be a Decimal', `,
    )
    .write(`path: ['Models', '${model.formattedNames.original}']`)
    .write(` })`);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};
