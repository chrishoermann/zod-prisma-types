import { writeImportStatementOptions } from 'src/classes';
import { type ContentWriterOptions } from '../../types';

export const writeInputJsonValue = ({
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
        name: 'InputJsonValue',
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
