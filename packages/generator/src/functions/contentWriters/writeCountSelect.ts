import {
  ExtendedDMMFOutputType,
  writeImportStatementOptions,
} from '../../classes';
import { type ContentWriterOptions } from '../../types';
import { getCommonArgImports } from './getCommonImports';

/**
 * `[Model]CountOutputTypeSelectSchema` needs to be generated when the model has a _count field.
 * The _count field is only added when a realtion field is a list.
 */
export const writeCountSelect = (
  {
    fileWriter: { writer, writeImports },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  model: ExtendedDMMFOutputType,
) => {
  const { useMultipleFiles, useExactOptionalPropertyTypes } =
    dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    const imports: writeImportStatementOptions[] = getCommonArgImports(
      dmmf.generatorConfig,
    );
    writeImports(imports);
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
