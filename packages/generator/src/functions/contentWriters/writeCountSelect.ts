import { ExtendedDMMFOutputType } from '../../classes';
import { type ContentWriterOptions } from '../../types';
import { writeZodImport } from '..';
import { getConfig } from '../../config';

/**
 * `[Model]CountOutputTypeSelectSchema` needs to be generated when the model has a _count field.
 * The _count field is only added when a realtion field is a list.
 */
export const writeCountSelect = (
  {
    fileWriter: { writer, writeImport },
    getSingleFileContent = false,
  }: ContentWriterOptions,
  model: ExtendedDMMFOutputType,
) => {
  const {
    useMultipleFiles,
    useExactOptionalPropertyTypes,
    prismaClientPath,
    inputTypePath,
  } = getConfig();

  if (useMultipleFiles && !getSingleFileContent) {
    writeZodImport(writeImport);
    writeImport('type { Prisma }', prismaClientPath);
    if (useExactOptionalPropertyTypes) {
      writeImport('ru', `../${inputTypePath}/RemoveUndefined`);
    }
  }

  writer
    .blankLine()
    .write(`export const ${model.name}CountOutputTypeSelectSchema: `)
    .write(`z.ZodType<Prisma.${model.name}CountOutputTypeSelect> = `)
    .write(`z.object(`)
    .inlineBlock(() => {
      model.fields.forEach((field) => {
        if (field.isListOutputType() && field.isObjectOutputType()) {
          writer.writeLine(`${field.name}: z.boolean().optional(),`);
        }
      });
    })
    .write(`).strict()`)
    .conditionalWrite(useExactOptionalPropertyTypes, '.transform(ru)')
    .write(`;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer
      .blankLine()
      .writeLine(`export default ${model.name}CountOutputTypeSelectSchema;`);
  }
};
