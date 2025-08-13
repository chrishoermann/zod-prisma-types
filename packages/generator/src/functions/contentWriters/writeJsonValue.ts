import { writeImportStatementOptions } from 'src/classes';
import { type ContentWriterOptions } from '../../types';

export const writeJsonValue = ({
  fileWriter: { writer, writeImports },
  dmmf,
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const {
    useMultipleFiles,
    prismaClientPath,
    prismaLibraryPath,
    isPrismaClientGenerator,
  } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    const imports: writeImportStatementOptions[] = [];
    imports.push({ name: 'z', path: 'zod' });
    if (isPrismaClientGenerator) {
      imports.push({
        name: 'JsonValue',
        path: prismaLibraryPath,
        isTypeOnly: true,
      });
    } else {
      imports.push({
        name: 'Prisma',
        path: prismaClientPath,
        isTypeOnly: true,
      });
    }
    writeImports(imports);
  }

  const jsonValueTypeName = isPrismaClientGenerator
    ? 'JsonValue'
    : 'Prisma.JsonValue';

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
            .writeLine(`z.record(z.lazy(() => JsonValueSchema.optional())),`)
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
