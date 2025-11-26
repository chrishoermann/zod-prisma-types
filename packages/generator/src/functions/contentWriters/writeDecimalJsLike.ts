import { type ContentWriterOptions } from '../../types';
import { writeZodImport } from '..';
import { getConfig } from '../../config';

export const writeDecimalJsLike = ({
  fileWriter: { writer, writeImport },
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const {
    useMultipleFiles,
    prismaClientPath,
    prismaLibraryPath,
    isPrismaClientGenerator,
    prismaVersion,
  } = getConfig();

  if (useMultipleFiles && !getSingleFileContent) {
    writeZodImport(writeImport);
    if (isPrismaClientGenerator && prismaVersion?.major === 6) {
      writeImport('type { DecimalJsLike }', `${prismaLibraryPath}`);
    } else if (isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7) {
      writeImport(
        'type { DecimalJsLike }',
        `${prismaClientPath}/runtime/library`,
      );
    } else {
      writeImport('type { Prisma }', `${prismaClientPath}`);
    }
  }

  let decimalJsLikeTypeName = '';

  if (isPrismaClientGenerator && prismaVersion?.major === 6) {
    decimalJsLikeTypeName = 'DecimalJsLike';
  } else if (isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7) {
    decimalJsLikeTypeName = 'DecimalJsLike';
  } else {
    decimalJsLikeTypeName = 'Prisma.DecimalJsLike';
  }

  writer
    .blankLine()
    .writeLine(
      `export const DecimalJsLikeSchema: z.ZodType<${decimalJsLikeTypeName}> = z.object({`,
    )
    .withIndentationLevel(1, () => {
      writer
        .writeLine(`d: z.array(z.number()),`)
        .writeLine(`e: z.number(),`)
        .writeLine(`s: z.number(),`)
        .writeLine(`toFixed: z.any(),`);
    })
    .writeLine(`})`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default DecimalJsLikeSchema;`);
  }
};
