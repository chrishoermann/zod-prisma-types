import { FileWriter } from '../classes';
import { CreateFiles } from '../types';
import {
  writeNonScalarType,
  writeScalarType,
  writeSpecialType,
} from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeInputTypeFiles: CreateFiles = async ({
  outputPath,
  extendedDMMF,
}) => {
  if (!extendedDMMF.createInputTypes()) return;

  const { inputTypePath, outputTypePath, prismaClientPath } =
    extendedDMMF.generatorConfig;

  // WRITE INDEX FILE
  // ------------------------------------------------------------
  const indexFileWriter = new FileWriter();

  const path = indexFileWriter.createPath(`${outputPath}/${inputTypePath}`);

  if (path) {
    indexFileWriter.createFile(`${path}/index.ts`, ({ writeExport }) => {
      extendedDMMF.schema.inputObjectTypes.prisma.forEach(({ name }) => {
        writeExport(`{ ${name}Schema }`, `./${name}Schema`);
      });
      extendedDMMF.schema.enumTypes.prisma.forEach(({ name }) => {
        writeExport(`{ ${name}Schema }`, `./${name}Schema`);
      });
      extendedDMMF.datamodel.enums.forEach(({ name }) => {
        writeExport(`{ ${name}Schema }`, `./${name}Schema`);
      });
      writeExport(`{ transformJsonNull }`, `./transformJsonNull`);
      writeExport(`{ NullableJsonValue }`, `./NullableJsonValue`);
      writeExport(`{ InputJsonValue }`, `./InputJsonValue`);
      writeExport(`{ DecimalJSLikeSchema }`, `./DecimalJsLikeSchema`);
      writeExport(`{ DecimalJSLikeListSchema }`, `./DecimalJsLikeListSchema`);
      writeExport(`{ isValidDecimalInput }`, `./isValidDecimalInput`);
    });

    ////////////////////////////////////////////////////
    // WRITE HELPER FUNCTIONS & SCHEMAS
    ////////////////////////////////////////////////////

    if (extendedDMMF.schema.hasJsonTypes) {
      // TRANSFORM JSON NULL
      // ------------------------------------------------------------
      const transformJsonNullWriter = new FileWriter();

      transformJsonNullWriter.createFile(
        `${path}/transformJsonNull.ts`,
        ({ writer, writeImport }) => {
          writeImport('{ Prisma }', prismaClientPath);

          writer
            .newLine()
            .writeLine(
              `export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull`,
            )
            .newLine()
            .write(
              `export const transformJsonNull = (v?: NullableJsonInput) => `,
            )
            .inlineBlock(() => {
              writer
                .writeLine(`if (!v || v === 'DbNull') return Prisma.DbNull;`)
                .writeLine(`if (v === 'JsonNull') return Prisma.JsonNull;`)
                .writeLine(`return v;`);
            })
            .blankLine()
            .writeLine(`export default transformJsonNull`);
        },
      );

      // JSON VALUE
      // ------------------------------------------------------------

      const jsonValueWriter = new FileWriter();

      jsonValueWriter.createFile(
        `${path}/JsonValue.ts`,
        ({ writer, writeImport }) => {
          writeImport('{ z }', 'zod');
          writeImport('{ Prisma }', prismaClientPath);

          writer
            .blankLine()
            .writeLine(
              `export const JsonValue: z.ZodType<Prisma.JsonValue> = z.union([`,
            )
            .withIndentationLevel(1, () => {
              writer
                .writeLine(`z.string(),`)
                .writeLine(`z.number(),`)
                .writeLine(`z.boolean(),`)
                .writeLine(`z.lazy(() => z.array(JsonValue)),`)
                .writeLine(`z.lazy(() => z.record(JsonValue)),`);
            })
            .writeLine(`])`)
            .blankLine()
            .writeLine(`export default JsonValue`);
        },
      );

      // NULLABLE JSON VALUE
      // ------------------------------------------------------------

      const nullableJsonValueWriter = new FileWriter();

      nullableJsonValueWriter.createFile(
        `${path}/NullableJsonValue.ts`,
        ({ writer, writeImport }) => {
          writeImport('{ z }', 'zod');
          writeImport('transformJsonNull', './transformJsonNull');
          writeImport('JsonValue', './JsonValue');

          writer
            .blankLine()
            .writeLine(`export const NullableJsonValue = z`)
            .withIndentationLevel(1, () => {
              writer
                .writeLine(
                  `.union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])`,
                )
                .writeLine('.nullable()')
                .writeLine(`.transform((v) => transformJsonNull(v))`);
            })
            .blankLine()
            .writeLine(`export default NullableJsonValue`);
        },
      );

      // NULLABLE JSON INPUT
      // ------------------------------------------------------------

      const nullableJsonInputWriter = new FileWriter();

      nullableJsonInputWriter.createFile(
        `${path}/InputJsonValue.ts`,
        ({ writer, writeImport }) => {
          writeImport('{ z }', 'zod');
          writeImport('{ Prisma }', prismaClientPath);

          writer
            .blankLine()
            .writeLine(
              `export const InputJsonValue: z.ZodType<Prisma.InputJsonValue> = z.union([`,
            )
            .withIndentationLevel(1, () => {
              writer
                .writeLine(`z.string(),`)
                .writeLine(`z.number(),`)
                .writeLine(`z.boolean(),`)
                .writeLine(`z.lazy(() => z.array(InputJsonValue.nullable())),`)
                .writeLine(
                  `z.lazy(() => z.record(InputJsonValue.nullable())),`,
                );
            })
            .write(`])`)
            .blankLine()
            .writeLine(`export default InputJsonValue`);
        },
      );
    }

    if (extendedDMMF.schema.hasDecimalTypes) {
      // DECIMAL JS LIKE
      // ------------------------------------------------------------

      new FileWriter().createFile(
        `${path}/DecimalJsLikeSchema.ts`,
        ({ writer, writeImport }) => {
          writeImport('{ z }', 'zod');

          writer
            .blankLine()
            .writeLine(
              `export const DecimalJSLikeSchema = z.object({ d: z.array(z.number()), e: z.number(), s: z.number() })`,
            )
            .blankLine()
            .writeLine(`export default DecimalJSLikeSchema`);
        },
      );

      new FileWriter().createFile(
        `${path}/DecimalJsLikeListSchema.ts`,
        ({ writer, writeImport }) => {
          writeImport('{ z }', 'zod');

          writer
            .blankLine()
            .writeLine(
              `export const DecimalJSLikeListSchema = z.object({ d: z.array(z.number()), e: z.number(), s: z.number() }).array()`,
            )
            .blankLine()
            .writeLine(`export default DecimalJSLikeListSchema`);
        },
      );

      // DECIMAL JS LIKE
      // ------------------------------------------------------------

      new FileWriter().createFile(
        `${path}/isValidDecimalInput.ts`,
        ({ writer, writeImport }) => {
          writeImport('{ Prisma }', prismaClientPath);
          writeImport('{ DecimalJsLike }', `${prismaClientPath}/runtime`);

          writer
            .blankLine()
            .writeLine(
              `export const DECIMAL_STRING_REGEX = /^[0-9.,e+\-bxffo_cp]+$|Infinity|NaN/`,
            )
            .blankLine()
            .writeLine(`export const isValidDecimalInput =`)
            .withIndentationLevel(1, () => {
              writer
                .writeLine(
                  `(v?: null | string | number | Prisma.Decimal | DecimalJsLike) =>`,
                )
                .inlineBlock(() => {
                  writer
                    .writeLine(`if (!v) return false;`)
                    .writeLine(`return (`)
                    .withIndentationLevel(2, () => {
                      writer
                        .writeLine(
                          `(typeof v === 'object' && Prisma.Decimal.isDecimal(v)) ||`,
                        )
                        .writeLine(
                          `(typeof v === 'object' && 'd' in v && 'e' in v && 's' in v) ||`,
                        )
                        .writeLine(
                          `(typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||`,
                        )
                        .writeLine(`typeof v === 'number'`);
                    })
                    .writeLine(`)`);
                });
            })
            .blankLine()
            .writeLine(`export default isValidDecimalInput`);
        },
      );
    }

    ////////////////////////////////////////////////////
    // WRITE ENUMS
    ////////////////////////////////////////////////////

    // WRITE ENUMS
    // ------------------------------------------------------------

    extendedDMMF.schema.enumTypes.prisma.forEach(
      ({ useNativeEnum, values, name }) => {
        new FileWriter().createFile(
          `${path}/${name}Schema.ts`,
          ({ writer, writeImport }) => {
            writeImport('{ z }', 'zod');

            if (useNativeEnum) {
              writeImport('{ Prisma }', prismaClientPath);

              writer
                .blankLine()
                .writeLine(
                  `export const ${name}Schema = z.nativeEnum(Prisma.${name})`,
                );
            } else {
              writer
                .conditionalWrite(
                  name.includes('NullableJson'),
                  `import transformJsonNull from './transformJsonNull'`,
                )
                .blankLine()
                .write(`export const ${name}Schema = z.enum([`);
              values.forEach((value) => {
                writer.write(`'${value}',`);
              });
              writer
                .write(`])`)
                .conditionalWrite(
                  name.includes('Nullable'),
                  `.transform((v) => transformJsonNull(v))`,
                );
            }
            writer
              .blankLine()
              .writeLine(
                `export type ${name}Type = \`z.infer<typeof ${name}Schema>\``,
              )
              .blankLine()
              .writeLine(`export default ${name}Schema`);
          },
        );
      },
    );

    extendedDMMF.datamodel.enums.forEach(({ name }) => {
      const fileWriter = new FileWriter();

      fileWriter.createFile(
        `${path}/${name}Schema.ts`,
        ({ writer, writeImport }) => {
          writeImport('{ z }', 'zod');
          writeImport(`{ ${name} }`, prismaClientPath);

          writer
            .blankLine()
            .writeLine(`export const ${name}Schema = z.nativeEnum(${name})`)
            .blankLine()
            .writeLine(
              `export type ${name}Type = \`\${z.infer<typeof ${name}Schema>}\``,
            )
            .blankLine()
            .writeLine(`export default ${name}Schema`);
        },
      );
    });

    ////////////////////////////////////////////////////
    // WRITER INCLUDE & SELECT
    ////////////////////////////////////////////////////

    extendedDMMF.schema.outputObjectTypes.model.forEach((model) => {
      if (model.hasRelationField()) {
        // INCLUDE SCHEMA
        // ------------------------------------------------------------

        const includeSchemaWriter = new FileWriter();

        includeSchemaWriter.createFile(
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
              .writeLine(
                `export const ${model.name}IncludeSchema: z.ZodType<Prisma.${model.name}Include> = z.object({`,
              )
              .withIndentationLevel(1, () => {
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
                      .write(`])`)
                      .write(`.optional()`)
                      .write(`,`)
                      .newLine();
                  }
                });
              })
              .write(`})`)
              .write(`.strict()`)
              .blankLine()
              .writeLine(`export default ${model.name}IncludeSchema`);
          },
        );
      }

      // SELECT SCHEMA
      // ------------------------------------------------------------

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

    extendedDMMF.schema.inputObjectTypes.prisma.forEach((inputType) => {
      const fileWriter = new FileWriter();

      fileWriter.createFile(
        `${path}/${inputType.name}Schema.ts`,
        ({ writer, writeImport, writeImportSet }) => {
          writeImport('{ z }', 'zod');
          writeImport('{ Prisma }', prismaClientPath);
          writeImportSet(inputType.imports);

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
                    writeValidation: extendedDMMF.addInputTypeValidation(),
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
                    writeValidation: extendedDMMF.addInputTypeValidation(),
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
                  writeValidation: extendedDMMF.addInputTypeValidation(),
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
                  writeValidation: extendedDMMF.addInputTypeValidation(),
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
