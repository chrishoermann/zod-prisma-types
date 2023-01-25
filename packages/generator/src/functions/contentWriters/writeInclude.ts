import { ExtendedDMMFOutputType } from '../../classes';
import { type ContentWriterOptions } from '../../types';

export const writeInclude = (
  { fileWriter: { writer, writeImport }, dmmf }: ContentWriterOptions,
  model: ExtendedDMMFOutputType,
  getSingleFileContent = false,
) => {
  const { useMultipleFiles, prismaClientPath, outputTypePath } =
    dmmf.generatorConfig;

  const addPrismaClient =
    useMultipleFiles || getSingleFileContent ? '' : 'PrismaClient.';

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
    writeImport('{ Prisma }', prismaClientPath);

    model.fields.forEach((field) => {
      if (field.isObjectOutputType()) {
        if (field.isListOutputType()) {
          writeImport(
            `{ ${field.outputType.type}FindManyArgsSchema }`,
            `../${outputTypePath}/${field.outputType.type}FindManyArgsSchema`,
          );
        } else {
          writeImport(
            `{ ${field.outputType.type}ArgsSchema }`,
            `../${outputTypePath}/${field.outputType.type}ArgsSchema`,
          );
        }
      }
    });
  }

  writer
    .blankLine()
    .write(`export const ${model.name}IncludeSchema: `)
    .write(`z.ZodType<${addPrismaClient}Prisma.${model.name}Include> = `)
    .write(`z.object(`)
    .inlineBlock(() => {
      model.fields.forEach((field) => {
        if (field.isObjectOutputType()) {
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
    .write(`).strict()`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${model.name}IncludeSchema;`);
  }
};
