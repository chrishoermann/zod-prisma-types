import { writeFieldAdditions } from '.';
import { ExtendedWriteFieldOptions } from '../types';

export const writeDecimal = ({
  writer,
  field,
  model,
  writeOptionalDefaults = false,
}: ExtendedWriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .write(`z.union([`)
    .write(`z.number(),`)
    .write(`z.string(),`)
    .write(`z.instanceof(PrismaClient.Prisma.Decimal),`)
    .write(`DecimalJSLikeSchema,`)
    .write(`]`)
    .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
    .write(`)`)
    .write(`.refine((v) => isValidDecimalInput(v),`)
    .write(
      ` { message: 'Field "${field.formattedNames.original}" must be a Decimal', `,
    )
    .write(`path: ['Models', '${model.formattedNames.original}']`)
    .write(` })`);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};
