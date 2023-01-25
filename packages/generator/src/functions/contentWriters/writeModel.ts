import { writeModelFields } from '../../utils';
import { ExtendedDMMFModel } from '../../classes';
import { type ContentWriterOptions } from '../../types';

export const writeModel = (
  {
    fileWriter: { writer, writeImport, writeImportSet, writeJSDoc },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  model: ExtendedDMMFModel,
) => {
  const { useMultipleFiles } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
    writeImportSet(model.imports);
  }

  writer.blankLine();

  writeJSDoc(model.clearedDocumentation);

  writer
    .write(`export const ${model.name}Schema = z.object(`)
    .inlineBlock(() => {
      [...model.enumFields, ...model.scalarFields].forEach((field) => {
        writeModelFields({
          writer,
          field,
          model,
          dmmf,
        });
      });
    })
    .write(`)`);

  if (model.writeOptionalDefaultValuesTypes()) {
    writer
      .blankLine()
      .write(`export const ${model.name}OptionalDefaultsSchema =`)
      .write(`${model.name}Schema.merge(z.object(`)
      .inlineBlock(() => {
        [...model.enumFields, ...model.scalarFields].forEach((field) => {
          if (!field.isOptionalDefaultField()) return;

          const writeOptions = {
            writer,
            field,
            writeOptionalDefaults: true,
          };

          writeModelFields({
            ...writeOptions,
            model,
            dmmf,
          });
        });
      })
      .write(`))`);
  }

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${model.name}Schema;`);
  }
};
