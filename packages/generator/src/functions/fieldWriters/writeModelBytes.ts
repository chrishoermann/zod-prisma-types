import { writeFieldAdditions } from '.';
import { ExtendedWriteFieldOptions } from '../../types';
import { globalConfig } from '../../config';

export const writeBytes = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: ExtendedWriteFieldOptions) => {
  const { prismaVersion } = globalConfig.getConfig();

  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .conditionalWrite(
      prismaVersion?.major === 6 || prismaVersion === undefined,
      `z.instanceof(Uint8Array<ArrayBufferLike>)`,
    )
    .conditionalWrite(
      prismaVersion?.major === 5 || prismaVersion?.major === 4,
      `z.instanceof(Buffer)`,
    );

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};
