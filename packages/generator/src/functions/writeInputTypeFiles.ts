import { DirectoryHelper } from '../classes';
// import { ZOD_IMPORT_STATEMENT } from '../constants';
import { CreateFiles } from '../types';
// import {
//   multiFileWriter,
//   // writeConstStatement,
//   // writeNonScalarType,
//   // writeSpecialType,
//   // writeScalarType,
// } from '../utils';
import fs from 'fs';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeInputTypeFiles: CreateFiles = async ({
  outputPath,
  project,
  extendedDMMF,
}) => {
  const subPath = 'inputTypes';

  const path = DirectoryHelper.createDir(`${outputPath}/${subPath}`);

  if (path) {
    // WRITE INDEX FILE
    // ------------------------------------------------------------
    const indexSource = project.createSourceFile(`${path}/index.ts`, {
      statements: [
        ...extendedDMMF.schema.inputObjectTypes.prisma.map((inputType) => {
          return `export{ ${inputType.name}Schema } from './${inputType.name}Schema'`;
        }),
      ],
    });

    indexSource.organizeImports();

    indexSource.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
    });

    // WRITE INDEX FILE
    // ------------------------------------------------------------

    extendedDMMF.schema.inputObjectTypes.prisma.forEach((inputType) => {
      const imports = [
        `import { z } from 'zod';`,
        `import * as PrismaClient from '@prisma/client';`,
        ...inputType.imports,
      ];

      // const joinedImports = imports.join(`\n`);

      // console.log(joinedImports);

      const writer = fs.createWriteStream(
        `${path}/${inputType.name}Schema.ts`,
        {
          flags: 'a',
        },
      );

      imports.forEach((v) => writer.write(`${v}\n`));
      writer.write(`\n`);

      const type = inputType.hasOmitFields()
        ? `z.ZodType<Omit<PrismaClient.Prisma.${
            inputType.name
          }, ${inputType.getOmitFieldsUnion()}>>`
        : `z.ZodType<PrismaClient.Prisma.${inputType.name}>`;

      writer.write(
        `export const ${inputType.name}Schema: ${type} = z.object({\n`,
      );

      inputType.fields.forEach((field) => {
        writer.write(`\t`);
        if (field.zodOmitField) {
          writer.write(`// omitted: `);
        }

        writer.write(`${field.name}: `);

        if (field.hasMultipleTypes) {
          writer.write(`z.union([ `);

          field.inputTypes.forEach((inputType, idx) => {
            const writeComma = idx !== field.inputTypes.length - 1;

            const zodType = inputType.getZodScalarType();
            if (!zodType) return;

            if (field.zodCustomValidatorString) {
              if (inputType.generatorConfig.addInputTypeValidation) {
                writer.write(field.zodCustomValidatorString);
              } else {
                writer.write(`z.${zodType}()`);
              }

              if (inputType.isList) {
                writer.write(`.array()`);
              }

              if (field.isOptional) {
                writer.write(`.optional()`);
              }

              if (field.isNullable) {
                writer.write(`.nullable()`);
              }

              if (writeComma) {
                writer.write(`, `);
              }
            } else {
              writer.write(`z.${zodType}(`);

              if (
                extendedDMMF.addInputTypeValidation() &&
                !!field.zodCustomErrors
              ) {
                writer.write(field.zodCustomErrors);
              }

              writer.write(`)`);

              if (
                extendedDMMF.addInputTypeValidation() &&
                !!field.zodValidatorString
              ) {
                writer.write(field.zodValidatorString);
              }

              if (inputType.isList) {
                writer.write(`.array()`);
              }

              if (field.isOptional) {
                writer.write(`.optional()`);
              }

              if (field.isNullable) {
                writer.write(`.nullable()`);
              }

              if (writeComma) {
                writer.write(`, \n`);
              }
            }

            // writeNonScalarType(writer, {
            //   inputType,
            //   writeComma,
            // });

            // writeSpecialType(writer, {
            //   inputType,
            //   zodCustomErrors,
            //   zodCustomValidatorString,
            //   writeComma,
            //   writeValidation: dmmf.addInputTypeValidation(),
            // });
          });

          writer.write(` ])`);
          !field.isRequired && writer.write(`.optional()`);
          field.isNullable && writer.write(`.nullable()`);
          writer.write(`,`);
        } else {
          const inputType = field.inputTypes[0];
          const zodType = inputType.getZodScalarType();
          if (!zodType) return;

          if (field.zodCustomValidatorString) {
            if (inputType.generatorConfig.addInputTypeValidation) {
              writer.write(field.zodCustomValidatorString);
            } else {
              writer.write(`z.${zodType}()`);
            }

            if (inputType.isList) {
              writer.write(`.array()`);
            }

            if (field.isOptional) {
              writer.write(`.optional()`);
            }

            if (field.isNullable) {
              writer.write(`.nullable()`);
            }

            writer.write(`,\n`);
          } else {
            writer.write(`z.${zodType}(`);

            if (
              extendedDMMF.addInputTypeValidation() &&
              !!field.zodCustomErrors
            ) {
              writer.write(field.zodCustomErrors);
            }

            writer.write(`)`);

            if (
              extendedDMMF.addInputTypeValidation() &&
              !!field.zodValidatorString
            ) {
              writer.write(field.zodValidatorString);
            }

            if (inputType.isList) {
              writer.write(`.array()`);
            }

            if (field.isOptional) {
              writer.write(`.optional()`);
            }

            if (field.isNullable) {
              writer.write(`.nullable()`);
            }

            writer.write(`,\n`);
          }
        }
      });

      writer.write('}).strict();\n');
    });
  }

  // multiFileWriter({
  //   ...options,
  //   subPath: 'inputTypes',
  //   useWriter: ({ dmmf, writeFile }) => {
  //     dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
  //       // when an omit field is present, the type is not a native prism type
  //       // but a zod union of the native type and an omit type
  //       // const type = inputType.hasOmitFields()
  //       //   ? `z.ZodType<Omit<PrismaClient.Prisma.${
  //       //       inputType.name
  //       //     }, ${inputType.getOmitFieldsUnion()}>>`
  //       //   : `z.ZodType<PrismaClient.Prisma.${inputType.name}>`;

  //       writeFile({
  //         name: inputType.name,
  //         writeStatement: (source) => {
  //           // add basic imports
  //           source.addImportDeclarations([ZOD_IMPORT_STATEMENT]);

  //           // const imports = inputType.getImports();

  //           console.log({ imports: inputType.imports, name: inputType.name });

  //           // add custom and automatic imports
  //           // if (imports.size > 0) {
  //           //   source.addStatements([...imports]);
  //           // }

  //           // source.addStatements([
  //           //   writeConstStatement({
  //           //     leadingTrivia: (writer) => writer.newLine(),
  //           //     declarations: [
  //           //       {
  //           //         name: `${inputType.formattedNames.original}Schema`,
  //           //         type,
  //           //         initializer: (writer) => {
  //           //           writer.write(`z.object(`);
  //           //           writer.inlineBlock(() => {
  //           //             inputType.fields.forEach((field) => {
  //           //               const {
  //           //                 isNullable,
  //           //                 isOptional,
  //           //                 zodCustomErrors,
  //           //                 zodValidatorString,
  //           //                 zodCustomValidatorString,
  //           //               } = field;

  //           //               if (field.zodOmitField) {
  //           //                 writer.write(`// omitted: `);
  //           //               }

  //           //               writer.write(`${field.name}: `);

  //           //               if (field.hasMultipleTypes) {
  //           //                 writer.write(`z.union([ `);

  //           //                 field.inputTypes.forEach((inputType, idx) => {
  //           //                   const writeComma =
  //           //                     idx !== field.inputTypes.length - 1;
  //           //                   writeScalarType(writer, {
  //           //                     inputType,
  //           //                     zodCustomErrors,
  //           //                     zodValidatorString,
  //           //                     zodCustomValidatorString,
  //           //                     writeComma,
  //           //                     writeValidation: dmmf.addInputTypeValidation(),
  //           //                   });
  //           //                   writeNonScalarType(writer, {
  //           //                     inputType,
  //           //                     writeComma,
  //           //                   });

  //           //                   writeSpecialType(writer, {
  //           //                     inputType,
  //           //                     zodCustomErrors,
  //           //                     zodCustomValidatorString,
  //           //                     writeComma,
  //           //                     writeValidation: dmmf.addInputTypeValidation(),
  //           //                   });
  //           //                 });

  //           //                 writer
  //           //                   .write(` ])`)
  //           //                   .conditionalWrite(
  //           //                     !field.isRequired,
  //           //                     `.optional()`,
  //           //                   )
  //           //                   .conditionalWrite(field.isNullable, `.nullable()`)
  //           //                   .write(`,`);
  //           //               } else {
  //           //                 const inputType = field.inputTypes[0];
  //           //                 writeScalarType(writer, {
  //           //                   inputType,
  //           //                   isNullable,
  //           //                   isOptional,
  //           //                   zodCustomErrors,
  //           //                   zodValidatorString,
  //           //                   zodCustomValidatorString,
  //           //                   writeValidation: dmmf.addInputTypeValidation(),
  //           //                 });
  //           //                 writeNonScalarType(writer, {
  //           //                   inputType,
  //           //                   isNullable,
  //           //                   isOptional,
  //           //                 });
  //           //                 writeSpecialType(writer, {
  //           //                   inputType,
  //           //                   zodCustomErrors,
  //           //                   zodCustomValidatorString,
  //           //                   isNullable,
  //           //                   isOptional,
  //           //                   writeValidation: dmmf.addInputTypeValidation(),
  //           //                 });
  //           //               }

  //           //               writer.newLine();
  //           //             });
  //           //           });
  //           //           writer.write(`)`).write(`.strict()`);
  //           //         },
  //           //       },
  //           //     ],
  //           //   }),
  //           // ]);
  //         },
  //       });
  //     });
  //   },
  // });
};
