import { FileWriter } from '../classes';
import { CreateFiles } from '../types';
import {
  writeNonScalarType,
  writeScalarType,
  writeSpecialType,
} from '../utils';
import {
  writeCustomEnum,
  writeDecimalJsLike,
  writeDecimalJsLikeList,
  writeInputJsonValue,
  writeIsValidDecimalInput,
  writeJsonValue,
  writeNullableJsonValue,
  writePrismaEnum,
  writeTransformJsonNull,
} from '.';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeInputTypeFiles: CreateFiles = ({ outputPath, dmmf }) => {
  if (!dmmf.createInputTypes()) return;

  const { inputTypePath, outputTypePath, prismaClientPath } =
    dmmf.generatorConfig;

  // WRITE INDEX FILE
  // ------------------------------------------------------------
  const indexFileWriter = new FileWriter();

  const path = indexFileWriter.createPath(`${outputPath}/${inputTypePath}`);

  if (path) {
    indexFileWriter.createFile(`${path}/index.ts`, ({ writeExport }) => {
      dmmf.schema.inputObjectTypes.prisma.forEach(({ name }) => {
        writeExport(`{ ${name}Schema }`, `./${name}Schema`);
      });

      dmmf.schema.enumTypes.prisma.forEach(({ name }) => {
        writeExport(`{ ${name}Schema }`, `./${name}Schema`);
      });

      dmmf.datamodel.enums.forEach(({ name }) => {
        writeExport(`{ ${name}Schema }`, `./${name}Schema`);
      });

      if (dmmf.schema.hasJsonTypes) {
        writeExport(`{ transformJsonNull }`, `./transformJsonNull`);
        writeExport(`{ NullableJsonValue }`, `./NullableJsonValue`);
        writeExport(`{ InputJsonValue }`, `./InputJsonValue`);
      }

      if (dmmf.schema.hasDecimalTypes) {
        writeExport(`{ DecimalJSLikeSchema }`, `./DecimalJsLikeSchema`);
        writeExport(`{ DecimalJSLikeListSchema }`, `./DecimalJsLikeListSchema`);
        writeExport(`{ isValidDecimalInput }`, `./isValidDecimalInput`);
      }
    });

    ////////////////////////////////////////////////////
    // WRITE HELPER FUNCTIONS & SCHEMAS
    ////////////////////////////////////////////////////

    // JSON
    // ------------------------------------------------------------

    if (dmmf.schema.hasJsonTypes) {
      new FileWriter().createFile(
        `${path}/transformJsonNull.ts`,
        (fileWriter) => writeTransformJsonNull({ fileWriter, dmmf }),
      );

      new FileWriter().createFile(`${path}/JsonValue.ts`, (fileWriter) =>
        writeJsonValue({ fileWriter, dmmf }),
      );

      new FileWriter().createFile(
        `${path}/NullableJsonValue.ts`,
        (fileWriter) => writeNullableJsonValue({ fileWriter, dmmf }),
      );

      new FileWriter().createFile(`${path}/InputJsonValue.ts`, (fileWriter) =>
        writeInputJsonValue({ fileWriter, dmmf }),
      );
    }

    // DECIMAL
    // ------------------------------------------------------------

    if (dmmf.schema.hasDecimalTypes) {
      new FileWriter().createFile(
        `${path}/DecimalJsLikeSchema.ts`,
        (fileWriter) => writeDecimalJsLike({ fileWriter, dmmf }),
      );

      new FileWriter().createFile(
        `${path}/DecimalJsLikeListSchema.ts`,
        (fileWriter) => writeDecimalJsLikeList({ fileWriter, dmmf }),
      );

      new FileWriter().createFile(
        `${path}/isValidDecimalInput.ts`,
        (fileWriter) => writeIsValidDecimalInput({ fileWriter, dmmf }),
      );
    }

    ////////////////////////////////////////////////////
    // WRITE ENUMS
    ////////////////////////////////////////////////////

    dmmf.schema.enumTypes.prisma.forEach((enumData) => {
      new FileWriter().createFile(
        `${path}/${enumData.name}Schema.ts`,
        (fileWriter) => writePrismaEnum({ fileWriter, dmmf }, enumData),
      );
    });

    dmmf.datamodel.enums.forEach((enumData) => {
      new FileWriter().createFile(
        `${path}/${enumData.name}Schema.ts`,
        (fileWriter) => writeCustomEnum({ fileWriter, dmmf }, enumData),
      );
    });

    ////////////////////////////////////////////////////
    // WRITER INCLUDE & SELECT
    ////////////////////////////////////////////////////

    dmmf.schema.outputObjectTypes.model.forEach((model) => {
      if (model.hasRelationField()) {
        // INCLUDE SCHEMA
        // ------------------------------------------------------------

        new FileWriter().createFile(
          `${path}/${model.name}IncludeSchema.ts`,
          ({ writer, writeImport }) => {
            writeImport('{ z }', 'zod');
            writeImport('{ Prisma }', prismaClientPath);

            model.fields.forEach((field) => {
              if (field.isObjectOutputType()) {
                writer
                  .conditionalWriteLine(
                    !field.isListOutputType(),
                    `import { ${field.outputType.type}ArgsSchema } from '../${outputTypePath}/${field.outputType.type}ArgsSchema'`,
                  )
                  .conditionalWriteLine(
                    field.isListOutputType(),
                    `import { ${field.outputType.type}FindManyArgsSchema } from '../${outputTypePath}/${field.outputType.type}FindManyArgsSchema'`,
                  );
              }
            });

            writer
              .blankLine()
              .write(`export const ${model.name}IncludeSchema: `)
              .write(`z.ZodType<Prisma.${model.name}Include> = `)
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
              .write(`).strict()`)
              .blankLine()
              .writeLine(`export default ${model.name}IncludeSchema`);
          },
        );
      }

      // SELECT SCHEMA
      // ------------------------------------------------------------

      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // TODO: Needs Check out if it should be moved to same file as arg schema
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      const selectSchemaWriter = new FileWriter();

      selectSchemaWriter.createFile(
        `${path}/${model.name}SelectSchema.ts`,
        ({ writer, writeImport }) => {
          writeImport('{ z }', 'zod');
          writeImport('{ Prisma }', prismaClientPath);

          model.fields.forEach((field) => {
            writer;
            if (field.isListOutputType() && field.isObjectOutputType()) {
              return writer.writeLine(
                `import { ${field.outputType.type}FindManyArgsSchema } from '../${outputTypePath}/${field.outputType.type}FindManyArgsSchema'`,
              );
            }

            if (field.isObjectOutputType()) {
              return writer.writeLine(
                `import { ${field.outputType.type}ArgsSchema } from '../${outputTypePath}/${field.outputType.type}ArgsSchema'`,
              );
            }

            return;
          });

          writer
            .blankLine()
            .writeLine(
              `export const ${model.name}SelectSchema: z.ZodType<Prisma.${model.name}Select> = z.object({`,
            )
            .withIndentationLevel(1, () => {
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
                    .write(
                      `z.lazy(() => ${field.outputType.type}FindManyArgsSchema)`,
                    )
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

          writer
            .write(`})`)
            .write(`.strict()`)
            .blankLine()
            .writeLine(`export default ${model.name}SelectSchema`);
        },
      );
    });

    ////////////////////////////////////////////////////
    // WRITE INPUT TYPE FILES
    ////////////////////////////////////////////////////

    dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
      new FileWriter().createFile(
        `${path}/${inputType.name}Schema.ts`,
        ({ writer, writeImport, writeImportSet }) => {
          writeImport('{ z }', 'zod');
          writeImport('{ Prisma }', prismaClientPath);
          writeImportSet(inputType.imports);

          // when an omit field is present, the type is not a native prism type
          // but a zod union of the native type and an omit type
          const type = inputType.hasOmitFields()
            ? `z.ZodType<Omit<Prisma.${
                inputType.name
              }, ${inputType.getOmitFieldsUnion()}>>`
            : `z.ZodType<Prisma.${inputType.name}>`;

          writer
            .blankLine()
            .write(`export const ${inputType.name}Schema: ${type} = `);

          writer.write(`z.object(`).inlineBlock(() => {
            inputType.fields.forEach((field) => {
              const {
                isNullable,
                isOptional,
                zodCustomErrors,
                zodValidatorString,
                zodCustomValidatorString,
              } = field;

              if (field.zodOmitField) {
                writer.write(`// omitted: `);
              }

              writer.write(`${field.name}: `);

              if (field.hasMultipleTypes) {
                writer.write(`z.union([ `);

                field.inputTypes.forEach((inputType, idx) => {
                  const writeComma = idx !== field.inputTypes.length - 1;
                  writeScalarType(writer, {
                    inputType,
                    zodCustomErrors,
                    zodValidatorString,
                    zodCustomValidatorString,
                    writeComma,
                    writeValidation: dmmf.addInputTypeValidation(),
                  });
                  writeNonScalarType(writer, {
                    inputType,
                    writeComma,
                  });
                  writeSpecialType(writer, {
                    inputType,
                    zodCustomErrors,
                    zodCustomValidatorString,
                    writeComma,
                    writeValidation: dmmf.addInputTypeValidation(),
                  });
                });

                writer
                  .write(` ])`)
                  .conditionalWrite(!field.isRequired, `.optional()`)
                  .conditionalWrite(field.isNullable, `.nullable()`)
                  .write(`,`);
              } else {
                const inputType = field.inputTypes[0];
                writeScalarType(writer, {
                  inputType,
                  isNullable,
                  isOptional,
                  zodCustomErrors,
                  zodValidatorString,
                  zodCustomValidatorString,
                  writeValidation: dmmf.addInputTypeValidation(),
                });
                writeNonScalarType(writer, {
                  inputType,
                  isNullable,
                  isOptional,
                });
                writeSpecialType(writer, {
                  inputType,
                  zodCustomErrors,
                  zodCustomValidatorString,
                  isNullable,
                  isOptional,
                  writeValidation: dmmf.addInputTypeValidation(),
                });
              }

              writer.newLine();
            });
          });

          writer
            .write(`)`)
            .write(`.strict()`)
            .blankLine()
            .writeLine(`export default ${inputType.name}Schema`);
        },
      );
    });
  }
};
