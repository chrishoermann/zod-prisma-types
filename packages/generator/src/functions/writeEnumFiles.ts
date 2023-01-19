import {
  getPrismaImportStatement,
  TRANSFORM_JSON_IMPORT_STATEMENT,
  ZOD_IMPORT_STATEMENT,
} from '../constants';
import { CreateFiles } from '../types';
import { multiFileWriter, writeConstStatement } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const writeEnumFiles: CreateFiles = async (options) => {
  multiFileWriter({
    ...options,
    subPath: 'enums',
    useWriter: ({ dmmf: extendedDMMF, writeFile }) => {
      extendedDMMF.schema.enumTypes.prisma.forEach(
        ({ useNativeEnum, values, name }) => {
          writeFile({
            name,
            writeStatement: (source) => {
              if (useNativeEnum) {
                source.addImportDeclarations([
                  ZOD_IMPORT_STATEMENT,
                  getPrismaImportStatement(
                    extendedDMMF.generatorConfig.prismaClientPath,
                  ),
                ]);

                source.addStatements([
                  writeConstStatement({
                    leadingTrivia: (writer) => writer.newLine(),
                    declarations: [
                      {
                        name: `${name}Schema`,
                        initializer(writer) {
                          writer.write(
                            `z.nativeEnum(PrismaClient.Prisma.${name})`,
                          );
                        },
                      },
                    ],
                  }),
                ]);
              } else {
                source.addImportDeclarations(
                  name.includes('NullableJson')
                    ? [TRANSFORM_JSON_IMPORT_STATEMENT, ZOD_IMPORT_STATEMENT]
                    : [ZOD_IMPORT_STATEMENT],
                );

                source.addStatements([
                  writeConstStatement({
                    leadingTrivia: (writer) => writer.newLine(),
                    declarations: [
                      {
                        name: `${name}Schema`,
                        initializer(writer) {
                          writer.write(`z.enum([`);
                          values.forEach((value) => {
                            writer.write(`'${value}',`);
                          });
                          writer
                            .write(`])`)
                            .conditionalWrite(
                              name.includes('Nullable'),
                              `.transform((v) => transformJsonNull(v))`,
                            );
                        },
                      },
                    ],
                  }),
                ]);
              }
            },
          });
        },
      );

      extendedDMMF.datamodel.enums.forEach(({ name }) => {
        writeFile({
          name,
          writeStatement: (source) => {
            source.addImportDeclarations([
              ZOD_IMPORT_STATEMENT,
              getPrismaImportStatement(
                extendedDMMF.generatorConfig.prismaClientPath,
              ),
            ]);

            source.addStatements([
              writeConstStatement({
                leadingTrivia: (writer) => writer.newLine(),
                declarations: [
                  {
                    name: `${name}Schema`,
                    initializer(writer) {
                      writer.write(`z.nativeEnum(PrismaClient.${name})`);
                    },
                  },
                ],
              }),
            ]);
          },
        });
      });
    },
  });
};
