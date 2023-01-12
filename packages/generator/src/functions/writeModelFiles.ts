import { ZOD_IMPORT_STATEMENT } from '../constants';
import { CreateFiles } from '../types';
import { multiFileWriter, writeConstStatement, writeJsDoc } from '../utils';
import {
  writeBytes,
  writeCustomValidator,
  writeDecimal,
  writeDecimalInstance,
  writeEnum,
  writeJson,
  writeScalar,
} from './getModelStatements';

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
                          if (field.clearedDocumentation) {
                            writeJsDoc(writer, field.clearedDocumentation);
                          }

                          if (field.zodCustomValidatorString) {
                            return writeCustomValidator({ writer, field });
                          }

                          if (field.kind === 'enum') {
                            return writeEnum({ writer, field });
                          }

                          if (field.isJsonType) {
                            return writeJson({ writer, field });
                          }

                          if (field.isBytesType) {
                            return writeBytes({ writer, field });
                          }

                          if (
                            field.isDecimalType &&
                            !dmmf.useInstanceOfForDecimal()
                          ) {
                            return writeDecimal({ writer, field, model, dmmf });
                          }

                          if (
                            field.isDecimalType &&
                            dmmf.useInstanceOfForDecimal()
                          ) {
                            return writeDecimalInstance({
                              writer,
                              field,
                              model,
                              dmmf,
                            });
                          }

                          return writeScalar({ writer, field });
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

                            if (field.zodCustomValidatorString) {
                              return writeCustomValidator(writeOptions);
                            }

                            if (field.kind === 'enum') {
                              return writeEnum(writeOptions);
                            }

                            if (field.isJsonType) {
                              return writeJson(writeOptions);
                            }

                            if (field.isBytesType) {
                              return writeBytes(writeOptions);
                            }

                            if (
                              field.isDecimalType &&
                              !dmmf.useInstanceOfForDecimal()
                            ) {
                              return writeDecimal({
                                ...writeOptions,
                                model,
                                dmmf,
                              });
                            }

                            if (
                              field.isDecimalType &&
                              dmmf.useInstanceOfForDecimal()
                            ) {
                              return writeDecimalInstance({
                                ...writeOptions,
                                model,
                                dmmf,
                              });
                            }

                            return writeScalar(writeOptions);
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
