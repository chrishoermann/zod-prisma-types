import { type ContentWriterOptions } from '../../types';

export const writeInputJsonValue = ({
  fileWriter: { writer, writeImport },
  dmmf,
}: ContentWriterOptions) => {
  const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;
  const addPrismaClient = useMultipleFiles ? '' : 'PrismaClient.';

  if (useMultipleFiles) {
    writeImport('{ z }', 'zod');
    writeImport('{ Prisma }', prismaClientPath);
  }

  writer
    .blankLine()
    .writeLine(
      `export const InputJsonValue: z.ZodType<${addPrismaClient}Prisma.InputJsonValue> = z.union([`,
    )
    .withIndentationLevel(1, () => {
      writer
        .writeLine(`z.string(),`)
        .writeLine(`z.number(),`)
        .writeLine(`z.boolean(),`)
        .writeLine(`z.lazy(() => z.array(InputJsonValue.nullable())),`)
        .writeLine(`z.lazy(() => z.record(InputJsonValue.nullable())),`);
    })
    .write(`]);`);

  if (useMultipleFiles) {
    writer.blankLine().writeLine(`export default InputJsonValue;`);
  }
};
