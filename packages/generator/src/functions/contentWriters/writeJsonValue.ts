import { type ContentWriterOptions } from '../../types';

export const writeJsonValue = ({
  fileWriter: { writer, writeImport },
  dmmf,
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;

  const addPrismaClient =
    useMultipleFiles || getSingleFileContent ? '' : 'PrismaClient.';

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
    writeImport('{ Prisma }', prismaClientPath);
  }

  writer
    .blankLine()
    .writeLine(
      `export const JsonValue: z.ZodType<${addPrismaClient}Prisma.JsonValue> = z.union([`,
    )
    .withIndentationLevel(1, () => {
      writer
        .writeLine(`z.string(),`)
        .writeLine(`z.number(),`)
        .writeLine(`z.boolean(),`)
        .writeLine(`z.lazy(() => z.array(JsonValue)),`)
        .writeLine(`z.lazy(() => z.record(JsonValue)),`);
    })
    .writeLine(`]);`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default JsonValue`);
  }
};
