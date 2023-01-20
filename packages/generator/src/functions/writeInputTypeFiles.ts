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
  // WRITE INDEX FILE
  // ------------------------------------------------------------
  const indexFileWriter = new FileWriter();

  const path = indexFileWriter.createPath(
    `${outputPath}/${extendedDMMF.generatorConfig.inputTypePath}`,
  );

  if (path) {
    indexFileWriter.createFile(`${path}/index.ts`, (writer) => {
      extendedDMMF.schema.inputObjectTypes.prisma.forEach((inputType) => {
        writer.writeLine(
          `export { ${inputType.name}Schema } from './${inputType.name}Schema'`,
        );
      });
      extendedDMMF.schema.enumTypes.prisma.forEach(({ name }) => {
        writer.writeLine(`export { ${name}Schema } from './${name}Schema'`);
      });
      extendedDMMF.datamodel.enums.forEach(({ name }) => {
        writer.writeLine(`export { ${name}Schema } from './${name}Schema'`);
      });
      writer.writeLine(
        `export { transformJsonNull } from './transformJsonNull'`,
      );
      writer.writeLine(`export { JsonValue } from './JsonValue'`);
      writer.writeLine(
        `export { NullableJsonValue } from './NullableJsonValue'`,
      );
      writer.writeLine(`export { InputJsonValue } from './InputJsonValue'`);
      writer.writeLine(
        `export { DecimalJSLikeSchema } from './DecimalJsLikeSchema'`,
      );
      writer.writeLine(
        `export { isValidDecimalInput } from './isValidDecimalInput'`,
      );
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
        (writer) => {
          writer.writeLine(
            `import * as PrismaClient from '${extendedDMMF.generatorConfig.prismaClientPath}'`,
          );
          writer.newLine();
          writer.writeLine(
            `export type NullableJsonInput = PrismaClient.Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | PrismaClient.Prisma.NullTypes.DbNull | PrismaClient.Prisma.NullTypes.JsonNull`,
          );
          writer.newLine();
          writer.write(
            `export const transformJsonNull = (v?: NullableJsonInput) => `,
          );
          writer.inlineBlock(() => {
            writer.writeLine(
              `if (!v || v === 'DbNull') return PrismaClient.Prisma.DbNull;`,
            );
            writer.writeLine(
              `if (v === 'JsonNull') return PrismaClient.Prisma.JsonNull;`,
            );
            writer.writeLine(`return v;`);
          });
          writer.blankLine();
          writer.writeLine(`export default transformJsonNull`);
        },
      );

      // JSON VALUE
      // ------------------------------------------------------------

      const jsonValueWriter = new FileWriter();

      jsonValueWriter.createFile(`${path}/JsonValue.ts`, (writer) => {
        writer.writeLine(`import { z } from 'zod'`);
        writer.writeLine(
          `import * as PrismaClient from '${extendedDMMF.generatorConfig.prismaClientPath}'`,
        );
        writer.blankLine();
        writer.writeLine(
          `export const JsonValue: z.ZodType<PrismaClient.Prisma.JsonValue> = z.union([`,
        );
        writer.withIndentationLevel(1, () => {
          writer.writeLine(`z.string(),`);
          writer.writeLine(`z.number(),`);
          writer.writeLine(`z.boolean(),`);
          writer.writeLine(`z.lazy(() => z.array(JsonValue)),`);
          writer.writeLine(`z.lazy(() => z.record(JsonValue)),`);
        });
        writer.writeLine(`])`);
        writer.blankLine();
        writer.writeLine(`export default JsonValue`);
      });

      // NULLABLE JSON VALUE
      // ------------------------------------------------------------

      const nullableJsonValueWriter = new FileWriter();

      nullableJsonValueWriter.createFile(
        `${path}/NullableJsonValue.ts`,
        (writer) => {
          writer.writeLine(`import { z } from 'zod'`);
          writer.writeLine(
            `import transformJsonNull from './transformJsonNull'`,
          );
          writer.writeLine(`import JsonValue from './JsonValue'`);
          writer.blankLine();
          writer.writeLine(`export const NullableJsonValue = z`);
          writer.withIndentationLevel(1, () => {
            writer.writeLine(
              `.union([JsonValue, z.literal('DbNull'), z.literal('JsonNull')])`,
            );
            writer.writeLine('.nullable()');
            writer.writeLine(`.transform((v) => transformJsonNull(v))`);
          });
          writer.blankLine();
          writer.writeLine(`export default NullableJsonValue`);
        },
      );

      // NULLABLE JSON INPUT
      // ------------------------------------------------------------

      const nullableJsonInputWriter = new FileWriter();

      nullableJsonInputWriter.createFile(
        `${path}/InputJsonValue.ts`,
        (writer) => {
          writer.writeLine(`import { z } from 'zod'`);
          writer.writeLine(
            `import * as PrismaClient from '${extendedDMMF.generatorConfig.prismaClientPath}'`,
          );
          writer.blankLine();
          writer.writeLine(
            `export const InputJsonValue: z.ZodType<PrismaClient.Prisma.InputJsonValue> = z.union([`,
          );
          writer.withIndentationLevel(1, () => {
            writer.writeLine(`z.string(),`);
            writer.writeLine(`z.number(),`);
            writer.writeLine(`z.boolean(),`);
            writer.writeLine(
              `z.lazy(() => z.array(InputJsonValue.nullable())),`,
            );
            writer.writeLine(
              `z.lazy(() => z.record(InputJsonValue.nullable())),`,
            );
          });
          writer.write(`])`);
          writer.blankLine();
          writer.writeLine(`export default InputJsonValue`);
        },
      );
    }

    if (extendedDMMF.schema.hasDecimalTypes) {
      // DECIMAL JS LIKE
      // ------------------------------------------------------------

      const decimalJsLikeWriter = new FileWriter();

      decimalJsLikeWriter.createFile(
        `${path}/DecimalJsLikeSchema.ts`,
        (writer) => {
          writer.writeLine(`import { z } from 'zod'`);
          writer.blankLine();
          writer.writeLine(
            `export const DecimalJSLikeSchema = z.object({ d: z.array(z.number()), e: z.number(), s: z.number() })`,
          );
          writer.blankLine();
          writer.writeLine(`export default DecimalJSLikeSchema`);
        },
      );

      // DECIMAL JS LIKE
      // ------------------------------------------------------------

      const isValidDecimalInputWriter = new FileWriter();

      isValidDecimalInputWriter.createFile(
        `${path}/isValidDecimalInput.ts`,
        (writer) => {
          writer.writeLine(
            `import { Prisma } from '${extendedDMMF.generatorConfig.prismaClientPath}'`,
          );
          writer.writeLine(
            `import { DecimalJsLike } from '${extendedDMMF.generatorConfig.prismaClientPath}/runtime'`,
          );
          writer.blankLine();
          writer.writeLine(
            `export const DECIMAL_STRING_REGEX = /^[0-9.,e+\-bxffo_cp]+$|Infinity|NaN/`,
          );
          writer.blankLine();
          writer.writeLine(`export const isValidDecimalInput =`);
          writer.withIndentationLevel(1, () => {
            writer
              .writeLine(
                `(v?: null | string | number | Prisma.Decimal | DecimalJsLike) =>`,
              )
              .inlineBlock(() => {
                writer.writeLine(`if (!v) return false;`);
                writer.writeLine(`return (`);
                writer.withIndentationLevel(2, () => {
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
                });
                writer.writeLine(`)`);
              });
          });
          writer.blankLine();
          writer.writeLine(`export default isValidDecimalInput`);
        },
      );
    }

    ////////////////////////////////////////////////////
    // WWRITE ENUMS
    ////////////////////////////////////////////////////

    // WRITE ENUMS
    // ------------------------------------------------------------

    extendedDMMF.schema.enumTypes.prisma.forEach(
      ({ useNativeEnum, values, name }) => {
        const fileWriter = new FileWriter();

        fileWriter.createFile(`${path}/${name}Schema.ts`, (writer) => {
          if (useNativeEnum) {
            writer.writeLine(`import { z } from 'zod'`);
            writer.writeLine(
              `import * as PrismaClient from '${extendedDMMF.generatorConfig.prismaClientPath}'`,
            );
            writer.blankLine();
            writer.writeLine(
              `export const ${name}Schema = z.nativeEnum(PrismaClient.Prisma.${name})`,
            );
            writer.blankLine();
            writer.writeLine(`export default ${name}Schema`);
          } else {
            writer.writeLine(`import { z } from 'zod'`);
            writer.conditionalWrite(
              name.includes('NullableJson'),
              `import transformJsonNull from './transformJsonNull'`,
            );
            writer.blankLine();
            writer.write(`export const ${name}Schema = z.enum([`);
            values.forEach((value) => {
              writer.write(`'${value}',`);
            });
            writer.write(`])`);
            writer.conditionalWrite(
              name.includes('Nullable'),
              `.transform((v) => transformJsonNull(v))`,
            );
            writer.blankLine();
            writer.writeLine(`export default ${name}Schema`);
          }
        });
      },
    );

    extendedDMMF.datamodel.enums.forEach(({ name }) => {
      const fileWriter = new FileWriter();

      fileWriter.createFile(`${path}/${name}Schema.ts`, (writer) => {
        writer.writeLine(`import { z } from 'zod'`);
        writer.writeLine(
          `import { ${name} } from '${extendedDMMF.generatorConfig.prismaClientPath}'`,
        );
        writer.blankLine();
        writer.writeLine(`export const ${name}Schema = z.nativeEnum(${name})`);
        writer.blankLine();
        writer.writeLine(`export default ${name}Schema`);
      });
    });

    ////////////////////////////////////////////////////
    // WRITER INCLUDE & SELECT
    ////////////////////////////////////////////////////

    ////////////////////////////////////////////////////
    // WRITE INPUT TYPE FILES
    ////////////////////////////////////////////////////

    extendedDMMF.schema.inputObjectTypes.prisma.forEach((inputType) => {
      const fileWriter = new FileWriter();

      //  TODO:  change to named Prisma import since the default import is not needed in this case
      const imports = [
        `import { z } from 'zod';`,
        `import { Prisma } from '@prisma/client';`,
        ...inputType.imports,
      ];

      fileWriter.createFile(`${path}/${inputType.name}Schema.ts`, (writer) => {
        imports.forEach((v) => writer.write(`${v}`).newLine());

        const type = inputType.hasOmitFields()
          ? `z.ZodType<Omit<Prisma.${
              inputType.name
            }, ${inputType.getOmitFieldsUnion()}>>`
          : `z.ZodType<Prisma.${inputType.name}>`;

        writer
          .blankLine()
          .write(`export const ${inputType.name}Schema: ${type} = `);

        writer.write(`z.object(`);
        writer.inlineBlock(() => {
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
        writer.write(`)`).write(`.strict()`);
        writer.blankLine();
        writer.writeLine(`export default ${inputType.name}Schema`);
      });
    });
  }
};
