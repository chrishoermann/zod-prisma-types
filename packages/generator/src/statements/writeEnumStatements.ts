import { GetStatements, Statement } from 'src/types';
import { writeConstStatement } from 'src/utils/writeConstStatement';
import { writeHeading } from 'src/utils/writeHeading';

// currently not working - need to investigate
export const writeEnumStatements: GetStatements = (datamodel, source) => {
  source.addStatements(
    datamodel.enums
      .map(
        ({
          // values,
          formattedNames,
          generateEnumFilter,
          generateEnumListFilter,
        }): Statement[] => {
          const enumStatements: Statement[] = [];

          // // GENERATE ENUM
          // // ---------------------------------------------------------------------

          // // enumStatements.push(
          // //   writeHeading(`${formattedNames.upperCaseSpace} ENUM`, 'FAT'),
          // //   writeConstStatement({
          // //     leadingTrivia: (writer) => writer.newLine(),
          // //     declarations: [
          // //       {
          // //         name: `${formattedNames.pascalCase}Type`,
          // //         initializer(writer) {
          // //           writer
          // //             .writeLine(`z.enum([`)
          // //             .withIndentationLevel(2, () => {
          // //               values.forEach((value) =>
          // //                 writer.writeLine(`'${value.name}',`),
          // //               );
          // //             })
          // //             .write(`])`);
          // //         },
          // //       },
          // //     ],
          // //   }),
          // // );

          enumStatements.push(
            writeHeading(`${formattedNames.upperCaseSpace} ENUM`, 'FAT'),
            writeConstStatement({
              leadingTrivia: (writer) => writer.newLine(),
              declarations: [
                {
                  name: `${formattedNames.pascalCase}Type`,
                  initializer(writer) {
                    writer.writeLine(
                      `z.nativeEnum(Prisma.${formattedNames.pascalCase})`,
                    );
                  },
                },
              ],
            }),
          );

          // GENERATE ENUM FILTER
          // ---------------------------------------------------------------------

          if (generateEnumFilter) {
            enumStatements.push(
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

          // GENERATE ENUM LIST FILTER
          // ---------------------------------------------------------------------

          if (generateEnumListFilter) {
            enumStatements.push(
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
                          writer.writeLine(`isEmpty: z.boolean().optional(),`);
                        })
                        .write(`)`);
                    },
                  },
                ],
              }),
            );
          }

          return enumStatements;
        },
      )
      .flat(),
  );
};
