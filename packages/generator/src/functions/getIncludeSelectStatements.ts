import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getIncludeSelectStatements: GetStatements = (dmmf) => {
  if (!dmmf.createInputTypes()) return [];

  const statements: Statement[] = [writeHeading(`SELECT & INCLUDE`, 'FAT')];

  // dmmf.schema.outputObjectTypes.model.forEach((model) => {
  //   statements.push(
  //     writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM'),
  //   );

  //   statements.push(
  //     writeConstStatement({
  //       leadingTrivia: (writer) => writer.newLine(),
  //       declarations: [
  //         {
  //           name: `${model.formattedNames.pascalCase}SelectSchema`,
  //           type: `z.ZodType<PrismaClient.Prisma.${model.formattedNames.pascalCase}Select>`,
  //           initializer(writer) {
  //             writer.write(`z.object({`);
  //             model.fields.forEach((field) => {
  //               if (field.outputType.isList) {
  //                 return writer
  //                   .write(`${field.formattedNames.camelCase}: `)
  //                   .write(`z.union([`)
  //                   .write(`z.boolean(),`)
  //                   .write(`z.lazy(() => ${field.outputType.type}ArgsSchema)`)
  //                   .write(`z.boolean()`)
  //                   .write(`.optional(),`)
  //                   .newLine();
  //               }

  //               return writer
  //                 .write(`${field.formattedNames.camelCase}: `)
  //                 .write(`z.boolean()`)
  //                 .write(`.optional(),`)
  //                 .newLine();
  //             });

  //             model.relationFields.forEach((field) => {
  //               writer
  //                 .write(`${field.formattedNames.camelCase}: `)
  //                 .write(`z.union([`)
  //                 .write(`z.boolean(),`)
  //                 .conditionalWrite(
  //                   !field.isList,
  //                   `z.lazy(() => ${field.type}ArgsSchema)`,
  //                 )
  //                 .conditionalWrite(
  //                   field.isList,
  //                   `z.lazy(() => ${field.type}FindManyArgsSchema)`,
  //                 )
  //                 .write(`]).optional(),`)
  //                 .newLine();
  //             });

  //             writer.write(`})`).write(`.strict()`);
  //           },
  //         },
  //       ],
  //     }),
  //   );
  // });

  dmmf.datamodel.models.forEach((model) => {
    statements.push(
      writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM'),
    );

    if (model.hasRelationFields) {
      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: `${model.formattedNames.pascalCase}ArgsSchema`,
              type: `z.ZodType<PrismaClient.Prisma.${model.formattedNames.pascalCase}Args>`,
              initializer(writer) {
                writer
                  .writeLine(`z.object({`)
                  .write(`select: `)
                  .write(
                    `z.lazy(() => ${model.formattedNames.pascalCase}SelectSchema).optional(),`,
                  )
                  .newLine()
                  .conditionalWrite(model.hasRelationFields, `include: `)
                  .conditionalWrite(
                    model.hasRelationFields,
                    `z.lazy(() => ${model.formattedNames.pascalCase}IncludeSchema).optional(),`,
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
            name: `${model.formattedNames.pascalCase}SelectSchema`,
            type: `z.ZodType<PrismaClient.Prisma.${model.formattedNames.pascalCase}Select>`,
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
                  .conditionalWrite(
                    !field.isList,
                    `z.lazy(() => ${field.type}ArgsSchema)`,
                  )
                  .conditionalWrite(
                    field.isList,
                    `z.lazy(() => ${field.type}FindManyArgsSchema)`,
                  )
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
              name: `${model.formattedNames.pascalCase}IncludeSchema`,
              type: `z.ZodType<PrismaClient.Prisma.${model.formattedNames.pascalCase}Include>`,
              initializer(writer) {
                writer.write(`z.object({`);
                model.relationFields.forEach((field) => {
                  writer
                    .write(`${field.formattedNames.camelCase}: `)
                    .write(`z.union([`)
                    .write(`z.boolean(),`)
                    .write(`z.lazy(() => ${field.type}ArgsSchema)`)
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
