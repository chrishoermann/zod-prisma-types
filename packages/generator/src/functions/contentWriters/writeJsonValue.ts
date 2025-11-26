import { type ContentWriterOptions } from '../../types';
import { writeZodImport } from '..';
import { getConfig } from '../../config';

export const writeJsonValue = ({
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
      writeImport('type { JsonValue }', prismaLibraryPath);
    } else {
      writeImport('type { Prisma }', prismaClientPath);
    }
  }

  let jsonValueTypeName = '';

  if (isPrismaClientGenerator && prismaVersion?.major === 6) {
    jsonValueTypeName = 'JsonValue';
  } else {
    jsonValueTypeName = 'Prisma.JsonValue';
  }

  writer
    .blankLine()
    .writeLine(
      `export const JsonValueSchema: z.ZodType<${jsonValueTypeName}> = z.lazy(() =>`,
    )
    .withIndentationLevel(1, () => {
      writer
        .writeLine('z.union([')
        .withIndentationLevel(2, () => {
          writer
            .writeLine(`z.string(),`)
            .writeLine(`z.number(),`)
            .writeLine(`z.boolean(),`)
            .writeLine(`z.literal(null),`)
            .writeLine(
              `z.record(z.string(), z.lazy(() => JsonValueSchema.optional())),`,
            )
            .writeLine(`z.array(z.lazy(() => JsonValueSchema)),`);
        })
        .writeLine(`])`);
    })
    .writeLine(`);`);
  writer
    .blankLine()
    .writeLine(`export type JsonValueType = z.infer<typeof JsonValueSchema>;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default JsonValueSchema`);
  }
};
