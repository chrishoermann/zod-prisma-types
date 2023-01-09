import { ExtendedDMMF } from 'src/classes';
import { Project } from 'ts-morph';
import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

// needs: extendedDMMF, path, project

export const getEnumStatements = (
  { schema, datamodel }: ExtendedDMMF,
  project: Project,
): void => {
  const statements: Statement[] = [writeHeading(`ENUMS`, 'FAT')];

  // PRISMA GENERATED ENUMS
  // ---------------------------------------------------------------------

  statements.push(writeHeading(`PRISMA GENERATED ENUMS`, 'SLIM'));

  schema.enumTypes.prisma.forEach(({ useNativeEnum, values, name }) => {
    // console.log({ name, values });
    if (useNativeEnum) {
      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: `${name}Schema`,
              initializer(writer) {
                writer.write(`z.nativeEnum(PrismaClient.Prisma.${name})`);
              },
            },
          ],
        }),
      );
    } else {
      statements.push(
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
      );
    }
  });

  // CUSTOM ENUMS
  // ---------------------------------------------------------------------

  statements.push(writeHeading(`CUSTOM ENUMS`, 'SLIM'));

  datamodel.enums.forEach(({ name }) => {
    statements.push(
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
    );
  });

  // return statements;
};
