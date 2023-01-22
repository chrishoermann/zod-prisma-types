import { FileWriter } from '../classes';
import { CreateFiles } from '../types';
import { writeModelFields } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeModelFiles: CreateFiles = async (options) => {
  const { outputPath, extendedDMMF } = options;
  const indexFileWriter = new FileWriter();

  const path = indexFileWriter.createPath(`${outputPath}/modelSchema`);

  if (path) {
    indexFileWriter.createFile(`${path}/index.ts`, ({ writeExport }) => {
      extendedDMMF.datamodel.models.forEach((model) => {
        writeExport(`{ ${model.name}Schema }`, `./${model.name}Schema`);
      });
    });
  }

  extendedDMMF.datamodel.models.forEach((model) => {
    const fileWriter = new FileWriter();

    fileWriter.createFile(
      `${path}/${model.name}Schema.ts`,
      ({ writeImport, writeImportSet, writer }) => {
        writeImport('{ z }', 'zod');
        writeImportSet(model.imports);

        writer.blankLine();

        writer.writeLine(`export const ${model.name}Schema = z.object({`);
        writer.withIndentationLevel(1, () => {
          [...model.enumFields, ...model.scalarFields].forEach((field) => {
            writeModelFields({
              writer,
              field,
              model,
              dmmf: extendedDMMF,
            });
          });
        });
        writer.write(`})`);

        if (model.writeOptionalDefaultValuesTypes()) {
          writer.blankLine();
          writer.writeLine(
            `export const ${model.name}OptionalDefaultsSchema = ${model.name}Schema.merge(z.object({`,
          );
          writer.withIndentationLevel(1, () => {
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
                dmmf: extendedDMMF,
              });
            });
          });
          writer.write(`}))`);
        }
      },
    );
  });
};
