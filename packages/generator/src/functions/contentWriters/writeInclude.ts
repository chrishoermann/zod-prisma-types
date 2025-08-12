import { ExtendedDMMFOutputType } from '../../classes';
import { type ContentWriterOptions } from '../../types';

export const writeInclude = (
  {
    fileWriter: { writer, writeImport, writeImportSet },
    dmmf,
  }: ContentWriterOptions,
  model: ExtendedDMMFOutputType,
  getSingleFileContent = false,
) => {
  const {
    useMultipleFiles,
    useExactOptionalPropertyTypes,
    prismaClientPath,
    inputTypePath,
  } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
    writeImport('type { Prisma }', prismaClientPath);
    if (useExactOptionalPropertyTypes) {
      writeImport('ru', `../${inputTypePath}/RemoveUndefined`);
    }
    writeImportSet(model.includeImports);
  }

  writer
    .blankLine()
    .write(`export const ${model.name}IncludeSchema: `)
    .write(`z.ZodType<Prisma.${model.name}Include> = `)
    .write(`z.object(`)
    .inlineBlock(() => {
      model.fields.forEach((field) => {
        // when using mongodb, the `include` type is created but not filled with any fields
        // to replicate this behaviour, the `include` schema is also created as empty object

        if (field.writeIncludeField) {
          writer
            .write(`${field.name}: `)
            .write(`z.union([`)
            .write(`z.boolean(),`)
            .conditionalWrite(
              field.isListOutputType(),
              `z.lazy(() => ${field.outputType.type}FindManyArgsSchema)`,
            )
            .conditionalWrite(
              !field.isListOutputType(),
              `z.lazy(() => ${field.outputType.type}ArgsSchema)`,
            )
            .write(`]).optional(),`)
            .newLine();
        }
      });
    })
    .write(`).strict()`)
    .conditionalWrite(useExactOptionalPropertyTypes, '.transform(ru)')
    .write(`;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${model.name}IncludeSchema;`);
  }
};
