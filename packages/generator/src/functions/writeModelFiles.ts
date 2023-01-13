import { ZOD_IMPORT_STATEMENT } from '../constants';
import { CreateFiles } from '../types';
import { multiFileWriter, writeConstStatement, writeJsDoc } from '../utils';
import { writeModelFields } from '.';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeModelFiles: CreateFiles = async (options) => {
  multiFileWriter({
    ...options,
    subPath: 'models',
    useWriter: ({ dmmf, writeFile }) => {
      dmmf.datamodel.models.forEach((model) => {
        writeFile({
          name: model.name,
          writeStatement: (source) => {
            // add basic imports
            source.addImportDeclarations([ZOD_IMPORT_STATEMENT]);

            // add custom and automatic imports
            if (model.imports.size > 0) {
              source.addStatements([...model.imports]);
            }

            source.addStatements([
              writeConstStatement({
                leadingTrivia: (writer) => {
                  writer.newLine();
                  writeJsDoc(writer, model.clearedDocumentation);
                },
                declarations: [
                  {
                    name: `${model.formattedNames.original}Schema`,
                    initializer(writer) {
                      writer.write(`z.object({`);
                      [...model.enumFields, ...model.scalarFields].forEach(
                        (field) => {
                          writeModelFields({
                            writer,
                            field,
                            model,
                            dmmf,
                          });
                        },
                      );
                      writer.write(`})`);
                    },
                  },
                ],
              }),
            ]);

            // check if a schema where fields with default values are optional should be generated
            if (model.writeOptionalDefaultValuesTypes()) {
              source.addStatements([
                writeConstStatement({
                  leadingTrivia: (writer) => {
                    writer.newLine();
                    writeJsDoc(writer, model.clearedDocumentation);
                  },
                  declarations: [
                    {
                      name: `${model.formattedNames.original}OptionalDefaultsSchema`,
                      initializer(writer) {
                        writer.writeLine(
                          `${model.formattedNames.original}Schema.merge(`,
                        );
                        writer.write(`z.object({`);
                        [...model.enumFields, ...model.scalarFields].forEach(
                          (field) => {
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
                          },
                        );
                        writer.writeLine(`})`).write(`)`);
                      },
                    },
                  ],
                }),
              ]);
            }
          },
        });
      });
    },
  });
};
