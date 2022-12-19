import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getIncludeSelectStatements: GetStatements = (dmmf) => {
  if (!dmmf.createInputTypes()) return [];

  const statements: Statement[] = [writeHeading(`SELECT & INCLUDE`, 'FAT')];

  dmmf.schema.outputObjectTypes.model.forEach((model) => {
    statements.push(
      writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM'),
    );

    if (model.hasRelationField()) {
      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: `${model.name}ArgsSchema`,
              type: `z.ZodType<PrismaClient.Prisma.${model.name}Args>`,
              initializer(writer) {
                writer
                  .writeLine(`z.object({`)
                  .write(`select: `)
                  .write(`z.lazy(() => ${model.name}SelectSchema).optional(),`)
                  .newLine()
                  .conditionalWrite(model.hasRelationField(), `include: `)
                  .conditionalWrite(
                    model.hasRelationField(),
                    `z.lazy(() => ${model.name}IncludeSchema).optional(),`,
                  )
                  .newLine()
                  .write(`})`)
                  .write(`.strict()`);
              },
            },
          ],
        }),
      );

      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: `${model.name}IncludeSchema`,
              type: `z.ZodType<PrismaClient.Prisma.${model.name}Include>`,
              initializer(writer) {
                writer.write(`z.object({`);
                model.fields.forEach((field) => {
                  if (field.isObjectOutputType()) {
                    writer
                      .write(`${field.name}: `)
                      .write(`z.union([`)
                      .write(`z.boolean(),`)
                      .conditionalWrite(
                        field.isListOutputType(),
                        `z.lazy(() => ${field.outputType.type}FindManyArgsSchema)`,
                      )
                      .conditionalWrite(
                        !field.isListOutputType(),
                        `z.lazy(() => ${field.outputType.type}ArgsSchema)`,
                      )
                      .write(`])`)
                      .write(`.optional()`)
                      .write(`,`)
                      .newLine();
                  }
                });

                writer.write(`})`).write(`.strict()`);
              },
            },
          ],
        }),
      );
    }

    if (model.hasCountField()) {
      // [Model]CountOutputTypeSelectSchema needs to be generated when the model has a _count field.
      // The _count field is only added when a realtion field is a list.
      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: `${model.name}CountOutputTypeArgsSchema`,
              type: `z.ZodType<PrismaClient.Prisma.${model.name}CountOutputTypeArgs>`,
              initializer(writer) {
                writer.write(`z.object(`).inlineBlock(() => {
                  writer
                    .write(`select: `)
                    .write(
                      `z.lazy(() => ${model.name}CountOutputTypeSelectSchema).nullish(),`,
                    )
                    .newLine();
                });
                writer.write(`)`).write(`.strict()`);
              },
            },
          ],
        }),
      );

      // If a relation field is a list, then the model has a _count field
      // and then the [Model]CountOutputTypeSelectSchema needs to be generated
      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: `${model.name}CountOutputTypeSelectSchema`,
              type: `z.ZodType<PrismaClient.Prisma.${model.name}CountOutputTypeSelect>`,
              initializer(writer) {
                writer
                  .write(`z.object(`)
                  .inlineBlock(() => {
                    model.fields.forEach((field) => {
                      if (
                        field.isListOutputType() &&
                        field.isObjectOutputType()
                      ) {
                        writer
                          .write(`${field.name}: `)
                          .write(`z.boolean()`)
                          .write(`.optional()`)
                          .write(`,`)
                          .newLine();
                      }
                    });
                  })
                  .write(`)`)
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
            name: `${model.name}SelectSchema`,
            type: `z.ZodType<PrismaClient.Prisma.${model.name}Select>`,
            initializer(writer) {
              writer.write(`z.object({`);
              model.fields.forEach((field) => {
                if (field.isEnumOutputType()) {
                  return writer
                    .write(`${field.name}: `)
                    .write(`z.boolean()`)
                    .write(`.optional(),`)
                    .newLine();
                }

                if (field.isListOutputType() && field.isObjectOutputType()) {
                  return writer
                    .write(`${field.name}: `)
                    .write(`z.union([`)
                    .write(`z.boolean(),`)
                    .write(
                      `z.lazy(() => ${field.outputType.type}FindManyArgsSchema)`,
                    )
                    .write(`])`)
                    .write(`.optional()`)
                    .write(`,`)
                    .newLine();
                }

                if (field.isObjectOutputType()) {
                  return writer
                    .write(`${field.name}: `)
                    .write(`z.union([`)
                    .write(`z.boolean(),`)
                    .write(`z.lazy(() => ${field.outputType.type}ArgsSchema)`)
                    .write(`])`)
                    .write(`.optional()`)
                    .write(`,`)
                    .newLine();
                }

                return writer
                  .write(`${field.name}: `)
                  .write(`z.boolean()`)
                  .write(`.optional(),`)
                  .newLine();
              });

              writer.write(`})`).write(`.strict()`);
            },
          },
        ],
      }),
    );
  });

  return statements;
};
