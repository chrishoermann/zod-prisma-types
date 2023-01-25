import { ExtendedDMMFOutputType } from '../../classes';
import { type ContentWriterOptions } from '../../types';

export const writeSelect = (
  {
    fileWriter: { writer, writeImport },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  model: ExtendedDMMFOutputType,
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
    .write(`export const ${model.name}SelectSchema: `)
    .write(`z.ZodType<${addPrismaClient}Prisma.${model.name}Select> = `)
    .write(`z.object(`)
    .inlineBlock(() => {
      model.fields.forEach((field) => {
        if (field.isEnumOutputType()) {
          return writer
            .write(`${field.name}: `)
            .write(`z.boolean()`)
            .write(`.optional(),`)
            .newLine();
        }

        if (field.isListOutputType() && field.isObjectOutputType()) {
          return writer
            .write(`${field.name}: `)
            .write(`z.union([`)
            .write(`z.boolean(),`)
            .write(`z.lazy(() => ${field.outputType.type}FindManyArgsSchema)`)
            .write(`])`)
            .write(`.optional()`)
            .write(`,`)
            .newLine();
        }

        if (field.isObjectOutputType()) {
          return writer
            .write(`${field.name}: `)
            .write(`z.union([`)
            .write(`z.boolean(),`)
            .write(`z.lazy(() => ${field.outputType.type}ArgsSchema)`)
            .write(`])`)
            .write(`.optional()`)
            .write(`,`)
            .newLine();
        }

        return writer
          .write(`${field.name}: `)
          .write(`z.boolean()`)
          .write(`.optional(),`)
          .newLine();
      });
    });

  writer.write(`).strict()`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${model.name}SelectSchema;`);
  }
};
