import { generatorHandler } from '@prisma/generator-helper';
import { Project, StructureKind } from 'ts-morph';

import { DirectoryHelper } from './classes/directoryHelper';
import { ExtendedDMMF } from './classes/extendedDmmf';
import { PRIMSA_IMPORT_STATEMENT, ZOD_IMPORT_STATEMENT } from './constants';
import { StatementsArray } from './types';
import { writeConstStatement } from './utils/writeConstStatement';
import { writeHeading } from './utils/writeHeading';

generatorHandler({
  onManifest: () => {
    return {
      defaultOutput: './generated/zod',
      prettyName: 'Zod Prisma Types',
    };
  },
  onGenerate: async (options) => {
    const path = options.generator.output;

    if (!path) throw new Error('No output path specified');

    // EXTENDED DMMF
    //--------------------------------------------------------------------------------
    // Create an instance of the extended DMMF class
    // This class extends the Prisma DMMF with additional information:
    // - name of models and fields in different formats (uppercase, pascalcase, camelcase)
    // - helper methods for generating types

    const extendedDMMF = new ExtendedDMMF(options.dmmf);

    const { datamodel } = extendedDMMF;
    const { enums, models } = datamodel;

    console.log('Output models:', models);

    // CREATE TS-MORPH PROJECT
    //--------------------------------------------------------------------------------
    // Ts-morph is used to generate the TypeScript files
    // For further information see: https://ts-morph.com/

    const project = new Project({
      tsConfigFilePath: './tsconfig.json',
      skipAddingFilesFromTsConfig: true,
    });

    // CREATE PATH
    //------------------------------------------------------

    // check if path exists, if not create it
    DirectoryHelper.pathExistsElseCreate(path.value);

    // CREATE SOURCE FILES
    //------------------------------------------------------

    const indexSource = project.createSourceFile(
      `${path.value}/index.ts`,
      {
        statements: [
          {
            kind: StructureKind.ExportDeclaration,
            moduleSpecifier: './enum',
          },
          {
            kind: StructureKind.ExportDeclaration,
            moduleSpecifier: './model',
          },
        ],
      },
      {
        overwrite: true,
      },
    );

    const enumSource = project.createSourceFile(
      `${path.value}/enum.ts`,
      { statements: [PRIMSA_IMPORT_STATEMENT, ZOD_IMPORT_STATEMENT] },
      { overwrite: true },
    );

    const modelSource = project.createSourceFile(
      `${path.value}/model.ts`,
      { statements: [ZOD_IMPORT_STATEMENT] },
      { overwrite: true },
    );

    // CREATE STATEMENTS
    //------------------------------------------------------

    enumSource.addStatements(
      enums
        .map(
          ({
            values,
            formattedNames,
            generateEnumFilter,
            generateEnumListFilter,
          }): StatementsArray => {
            const filters: StatementsArray = [];

            if (generateEnumFilter) {
              filters.push(
                writeHeading(`${formattedNames.upperCaseSpace} - ENUM FILTER`),
                writeConstStatement({
                  leadingTrivia: (writer) => writer.newLine(),
                  declarations: [
                    {
                      name: `Enum${formattedNames.pascalCase}FilterType`,
                      initializer(writer) {
                        writer
                          .write(`z.object(`)
                          .inlineBlock(() => {
                            writer.write(
                              `equals: z.lazy(() => ${formattedNames.pascalCase}Type).optional(),`,
                            );
                            writer
                              .writeLine(`in: z`)
                              .withIndentationLevel(2, () =>
                                writer
                                  .writeLine(
                                    `.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`,
                                  )
                                  .writeLine(`.optional(),`),
                              );
                            writer
                              .writeLine(`notIn: z`)
                              .withIndentationLevel(2, () =>
                                writer
                                  .writeLine(
                                    `.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`,
                                  )
                                  .writeLine(`.optional(),`),
                              );
                            writer
                              .writeLine(`not: z`)
                              .withIndentationLevel(2, () =>
                                writer
                                  .writeLine(
                                    `.union([z.lazy(() => NestedEnum${formattedNames.pascalCase}FilterType), z.lazy(() => ${formattedNames.pascalCase}Type)])`,
                                  )
                                  .writeLine(`.optional(),`),
                              );
                          })
                          .write(`)`);
                      },
                    },
                  ],
                }),
                writeConstStatement({
                  leadingTrivia: (writer) => writer.newLine(),
                  declarations: [
                    {
                      name: `NestedEnum${formattedNames.pascalCase}FilterType`,
                      type: `z.ZodType<Prisma.NestedEnum${formattedNames.pascalCase}Filter>`,
                      initializer(writer) {
                        writer
                          .write(`z.object(`)
                          .inlineBlock(() => {
                            writer.write(
                              `equals: z.lazy(() => ${formattedNames.pascalCase}Type).optional(),`,
                            );
                            writer
                              .writeLine(`in: z`)
                              .withIndentationLevel(2, () =>
                                writer
                                  .writeLine(
                                    `.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`,
                                  )
                                  .writeLine(`.optional(),`),
                              );
                            writer
                              .writeLine(`notIn: z`)
                              .withIndentationLevel(2, () =>
                                writer
                                  .writeLine(
                                    `.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`,
                                  )
                                  .writeLine(`.optional(),`),
                              );
                            writer
                              .writeLine(`not: z`)
                              .withIndentationLevel(2, () =>
                                writer
                                  .writeLine(
                                    `.union([z.lazy(() => NestedEnum${formattedNames.pascalCase}FilterType), z.lazy(() => ${formattedNames.pascalCase}Type)])`,
                                  )
                                  .writeLine(`.optional(),`),
                              );
                          })
                          .write(`)`);
                      },
                    },
                  ],
                }),
              );
            }

            if (generateEnumListFilter) {
              filters.push(
                writeHeading(
                  `${formattedNames.upperCaseSpace} - ENUM LIST FILTER`,
                ),
                writeConstStatement({
                  leadingTrivia: (writer) => writer.newLine(),
                  declarations: [
                    {
                      name: `Enum${formattedNames.pascalCase}NullableListFilterType`,
                      initializer(writer) {
                        writer
                          .write(`z.object(`)
                          .inlineBlock(() => {
                            writer
                              .writeLine(`equals: z`)
                              .withIndentationLevel(2, () =>
                                writer
                                  .writeLine(
                                    `.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type)), z.null()])`,
                                  )
                                  .writeLine(`.optional(),`),
                              );
                            writer
                              .writeLine(`has: z`)
                              .withIndentationLevel(2, () =>
                                writer
                                  .writeLine(
                                    `.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.null()])`,
                                  )
                                  .writeLine(`.optional(),`),
                              );
                            writer
                              .writeLine(`hasEvery: z`)
                              .withIndentationLevel(2, () =>
                                writer
                                  .writeLine(
                                    `.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`,
                                  )
                                  .writeLine(`.optional(),`),
                              );
                            writer
                              .writeLine(`hasSome: z`)
                              .withIndentationLevel(2, () =>
                                writer
                                  .writeLine(
                                    `.union([z.lazy(() => ${formattedNames.pascalCase}Type), z.array(z.lazy(() => ${formattedNames.pascalCase}Type))])`,
                                  )
                                  .writeLine(`.optional(),`),
                              );
                            writer.writeLine(
                              `isEmpty: z.boolean().optional(),`,
                            );
                          })
                          .write(`)`);
                      },
                    },
                  ],
                }),
              );
            }

            return [
              writeHeading(`${formattedNames.upperCaseSpace} ENUM`, 'FAT'),
              writeConstStatement({
                leadingTrivia: (writer) => writer.newLine(),
                declarations: [
                  {
                    name: `${formattedNames.pascalCase}Type`,
                    initializer(writer) {
                      writer
                        .writeLine(`z.enum([`)
                        .withIndentationLevel(2, () => {
                          values.forEach((value) =>
                            writer.writeLine(`'${value.name}',`),
                          );
                        })
                        .write(`])`);
                    },
                  },
                ],
              }),
              ...filters,
            ];
          },
        )
        .flat(),
    );

    // FORMAT SOURCE FILES
    //------------------------------------------------------

    indexSource.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
    });

    enumSource.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
    });

    modelSource.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
    });

    // SAVE SOURCE FILES
    //------------------------------------------------------

    return project.save();
  },
});
