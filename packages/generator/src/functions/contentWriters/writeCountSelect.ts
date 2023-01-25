import { ExtendedDMMFOutputType } from '../../classes';
import { type ContentWriterOptions } from '../../types';

/**
 * `[Model]CountOutputTypeSelectSchema` needs to be generated when the model has a _count field.
 * The _count field is only added when a realtion field is a list.
 */
export const writeCountSelect = (
  {
    fileWriter: { writer, writeImport },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  model: ExtendedDMMFOutputType,
) => {
  const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;

  const addPrismaClient =
    useMultipleFiles || getSingleFileContent ? '' : 'PrismaClient.';

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
    writeImport('{ Prisma }', prismaClientPath);
  }

  writer
    .blankLine()
    .write(`export const ${model.name}CountOutputTypeSelectSchema: `)
    .write(
      `z.ZodType<${addPrismaClient}Prisma.${model.name}CountOutputTypeSelect> = `,
    )
    .write(`z.object(`)
    .inlineBlock(() => {
      model.fields.forEach((field) => {
        if (field.isListOutputType() && field.isObjectOutputType()) {
          writer.writeLine(`${field.name}: z.boolean().optional(),`);
        }
      });
    })
    .write(`).strict();`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer
      .blankLine()
      .writeLine(`export default ${model.name}CountOutputTypeSelectSchema;`);
  }
};