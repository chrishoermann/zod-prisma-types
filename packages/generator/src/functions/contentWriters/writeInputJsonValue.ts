import { type ContentWriterOptions } from '../../types';
import { writeZodImport } from '..';
import { getConfig } from '../../config';

export const writeInputJsonValue = ({
  fileWriter: { writer, writeImport },
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const {
    useMultipleFiles,
    prismaClientPath,
    prismaLibraryPath,
    isPrismaClientGenerator,
  } = getConfig();

  if (useMultipleFiles && !getSingleFileContent) {
    writeZodImport(writeImport);
    if (isPrismaClientGenerator) {
      writeImport('type { InputJsonValue }', prismaLibraryPath);
    } else {
      writeImport('{ Prisma }', prismaClientPath);
    }
  }

  const inputJsonValueTypeName = isPrismaClientGenerator
    ? 'InputJsonValue'
    : 'Prisma.InputJsonValue';

  writer
    .blankLine()
    .writeLine(
      `export const InputJsonValueSchema: z.ZodType<${inputJsonValueTypeName}> = z.lazy(() =>`,
    )
    .withIndentationLevel(1, () => {
      writer
        .writeLine('z.union([')
        .withIndentationLevel(2, () => {
          writer
            .writeLine(`z.string(),`)
            .writeLine(`z.number(),`)
            .writeLine(`z.boolean(),`)
            .writeLine(
              `z.object({ toJSON: z.function(z.tuple([]), z.any()) }),`,
            )
            .writeLine(
              `z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),`,
            )
            .writeLine(
              `z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),`,
            );
        })
        .writeLine(`])`);
    })
    .writeLine(`);`);
  writer
    .blankLine()
    .writeLine(
      `export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;`,
    );

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default InputJsonValueSchema;`);
  }
};
