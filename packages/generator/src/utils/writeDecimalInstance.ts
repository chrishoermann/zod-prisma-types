import { writeFieldAdditions } from '.';
import { ExtendedWriteFieldOptions } from '../types';

export const writeDecimalInstance = ({
  writer,
  field,
  dmmf,
  writeOptionalDefaults = false,
}: ExtendedWriteFieldOptions) => {
  if (dmmf.useInstanceOfForDecimal()) {
    writer
      .conditionalWrite(field.omitInModel(), '// omitted: ')
      .write(`${field.formattedNames.original}: `)
      .write(`z.instanceof(PrismaClient.Prisma.Decimal)`);

    writeFieldAdditions({ writer, field, writeOptionalDefaults });
  }
};
