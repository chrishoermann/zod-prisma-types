import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getEnumStatements: GetStatements = ({ schema, datamodel }) => {
  const statements: Statement[] = [writeHeading(`ENUMS`, 'FAT')];

  // PRISMA GENERATED ENUMS
  // ---------------------------------------------------------------------

  statements.push(writeHeading(`PRISMA GENERATED ENUMS`, 'SLIM'));

  schema.enumTypes.prisma.forEach(
    ({ formattedNames, useNativeEnum, values }) => {
      if (useNativeEnum) {
        statements.push(
          writeConstStatement({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
              {
                name: `${formattedNames.pascalCase}Schema`,
                initializer(writer) {
                  writer.write(
                    `z.nativeEnum(Prisma.Prisma.${formattedNames.pascalCase})`,
                  );
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
                name: `${formattedNames.pascalCase}Schema`,
                initializer(writer) {
                  writer.write(`z.enum([`);
                  values.forEach((value) => {
                    writer.write(`'${value}',`);
                  });
                  writer.write(`])`);
                },
              },
            ],
          }),
        );
      }
    },
  );

  // CUSTOM ENUMS
  // ---------------------------------------------------------------------

  statements.push(writeHeading(`CUSTOM ENUMS`, 'SLIM'));

  datamodel.enums.forEach(({ formattedNames }) => {
    statements.push(
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `${formattedNames.pascalCase}Schema`,
            initializer(writer) {
              writer.write(`z.nativeEnum(Prisma.${formattedNames.pascalCase})`);
            },
          },
        ],
      }),
    );
  });

  return statements;
};
