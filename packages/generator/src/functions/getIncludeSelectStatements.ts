/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getIncludeSelectStatements: GetStatements = ({ datamodel }) => {
  const statements: Statement[] = [writeHeading(`SELECT & INCLUDE`, 'FAT')];

  datamodel.models.forEach((model) => {
    statements.push(
      writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM'),
    );

    if (model.hasRelationFields) {
      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: `${model.formattedNames.pascalCase}Args`,
              type: `z.ZodType<Prisma.Prisma.${model.formattedNames.pascalCase}Args>`,
              initializer(writer) {
                writer
                  .writeLine(`z.object({`)
                  .write(`select: `)
                  .write(
                    `z.lazy(() => ${model.formattedNames.pascalCase}Select).optional(),`,
                  )
                  .newLine()
                  .conditionalWrite(model.hasRelationFields, `include: `)
                  .conditionalWrite(
                    model.hasRelationFields,
                    `z.lazy(() => ${model.formattedNames.pascalCase}Include).optional(),`,
                  )
                  .newLine()
                  .write(`})`)
                  .write(`.strict()`);
              },
            },
          ],
        }),
      );
    }

    statements.push(
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `${model.formattedNames.pascalCase}Select`,
            type: `z.ZodType<Prisma.Prisma.${model.formattedNames.pascalCase}Select>`,
            initializer(writer) {
              writer.write(`z.object({`);
              [...model.scalarFields, ...model.enumFields].forEach((field) => {
                writer
                  .write(`${field.formattedNames.camelCase}: `)
                  .write(`z.boolean().optional(),`)
                  .newLine();
              });

              model.relationFields.forEach((field) => {
                writer
                  .write(`${field.formattedNames.camelCase}: `)
                  .write(`z.union([`)
                  .write(`z.boolean(),`)
                  .write(`z.lazy(() => ${field.type}Args)`)
                  .write(`]).optional(),`)
                  .newLine();
              });

              writer.write(`})`).write(`.strict()`);
            },
          },
        ],
      }),
    );

    if (model.hasRelationFields) {
      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: `${model.formattedNames.pascalCase}Include`,
              type: `z.ZodType<Prisma.Prisma.${model.formattedNames.pascalCase}Include>`,
              initializer(writer) {
                writer.write(`z.object({`);
                model.relationFields.forEach((field) => {
                  writer
                    .write(`${field.formattedNames.camelCase}: `)
                    .write(`z.union([`)
                    .write(`z.boolean(),`)
                    .write(`z.lazy(() => ${field.type}Args)`)
                    .write(`]).optional(),`)
                    .newLine();
                });

                writer.write(`})`).write(`.strict()`);
              },
            },
          ],
        }),
      );
    }
  });

  return statements;
};
