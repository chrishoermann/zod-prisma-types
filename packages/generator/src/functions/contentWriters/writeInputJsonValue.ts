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
    prismaVersion,
  } = getConfig();

  if (useMultipleFiles && !getSingleFileContent) {
    writeZodImport(writeImport);
    if (isPrismaClientGenerator && prismaVersion?.major === 6) {
      writeImport('type { InputJsonValue }', prismaLibraryPath);
    } else if (isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7) {
      writeImport(
        'type { InputJsonValue }',
        `${prismaClientPath}/runtime/library`,
      );
    } else {
      writeImport('{ Prisma }', prismaClientPath);
    }
  }

  let inputJsonValueTypeName = '';

  if (isPrismaClientGenerator && prismaVersion?.major === 6) {
    inputJsonValueTypeName = 'InputJsonValue';
  } else if (isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7) {
    inputJsonValueTypeName = 'InputJsonValue';
  } else {
    inputJsonValueTypeName = 'Prisma.InputJsonValue';
  }

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
            .writeLine(`z.object({ toJSON: z.any() }),`)
            .writeLine(
              `z.record(z.string(), z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),`,
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
