import { type ContentWriterOptions } from '../../types';
import { writeZodImport } from '../zodCompatibility';
import { globalConfig } from '../../config';

export const writeDecimalJsLikeList = ({
  fileWriter: { writer, writeImport },
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const {
    useMultipleFiles,
    prismaClientPath,
    prismaLibraryPath,
    isPrismaClientGenerator,
  } = globalConfig.getConfig();

  if (useMultipleFiles && !getSingleFileContent) {
    writeZodImport(writeImport);
    if (isPrismaClientGenerator) {
      writeImport('type { DecimalJsLike }', `${prismaLibraryPath}`);
    } else {
      writeImport('type { Prisma }', `${prismaClientPath}`);
    }
  }

  const decimalJsLikeListTypeName = isPrismaClientGenerator
    ? 'DecimalJsLike'
    : 'Prisma.DecimalJsLike';

  writer
    .blankLine()
    .writeLine(
      `export const DecimalJsLikeListSchema: z.ZodType<${decimalJsLikeListTypeName}[]> = z.object({`,
    )
    .withIndentationLevel(1, () => {
      writer
        .writeLine(`d: z.array(z.number()),`)
        .writeLine(`e: z.number(),`)
        .writeLine(`s: z.number(),`)
        .writeLine(`toFixed: z.function(z.tuple([]), z.string()),`);
    })
    .writeLine(`}).array();`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default DecimalJsLikeListSchema;`);
  }
};
