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

  const path = indexFileWriter.createPath(`${outputPath}/inputTypes`);

  if (path) {
    indexFileWriter.createFile(`${path}/index.ts`, (writer) => {
      extendedDMMF.schema.inputObjectTypes.prisma.forEach((inputType) => {
        writer.writeLine(
          `export{ ${inputType.name}Schema } from './${inputType.name}Schema'`,
        );
      });
      extendedDMMF.schema.enumTypes.prisma.forEach(({ name }) => {
        writer.writeLine(`export{ ${name}Schema } from './${name}Schema'`);
      });
      extendedDMMF.datamodel.enums.forEach(({ name }) => {
        writer.writeLine(`export{ ${name}Schema } from './${name}Schema'`);
      });
    });

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
          } else {
            writer.writeLine(`import { z } from 'zod'`);
            writer.conditionalWrite(
              name.includes('NullableJson'),
              `import { transformJsonNull } from '../utils'`,
            );

            writer.blankLine();

            writer.writeLine(`export const ${name}Schema = z.enum([`);
            values.forEach((value) => {
              writer.writeLine(`'${value}',`);
            });
            writer.writeLine(`])`);
            writer.conditionalWrite(
              name.includes('Nullable'),
              `.transform((v) => transformJsonNull(v))`,
            );
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
      });
    });

    // WRITE INPUT TYPE FILES
    // ------------------------------------------------------------

    extendedDMMF.schema.inputObjectTypes.prisma.forEach((inputType) => {
      const fileWriter = new FileWriter();

      //  TODO:  change to named Prisma import since the default import is not needed in this case
      const imports = [
        `import { z } from 'zod';`,
        `import * as PrismaClient from '@prisma/client';`,
        ...inputType.imports,
      ];

      fileWriter.createFile(`${path}/${inputType.name}Schema.ts`, (writer) => {
        imports.forEach((v) => writer.write(`${v}`).newLine());

        const type = inputType.hasOmitFields()
          ? `z.ZodType<Omit<PrismaClient.Prisma.${
              inputType.name
            }, ${inputType.getOmitFieldsUnion()}>>`
          : `z.ZodType<PrismaClient.Prisma.${inputType.name}>`;

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
      });
    });
  }
};
