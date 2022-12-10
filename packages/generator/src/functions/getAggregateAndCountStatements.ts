import { PRISMA_TO_ZOD_TYPE_MAP } from '../constants';
import { GetStatements, Statement, ZodPrismaScalarType } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getAggregateAndCountStatements: GetStatements = (dmmf) => {
  if (!dmmf.createInputTypes()) return [];

  const statements: Statement[] = [writeHeading(`ARGS`, 'FAT')];

  dmmf.schema.outputObjectTypes.prisma
    .filter(
      (type) =>
        type.name !== 'Query' &&
        type.name !== 'Mutation' &&
        !type.name.includes('AffectedRows'),
    )
    .forEach((outputType) => {
      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: `${outputType.name}Schema`,
              type: `z.ZodType<PrismaClient.Prisma.${outputType.name}>`,
              initializer: (writer) => {
                writer.write(`z.object(`);
                writer.inlineBlock(() => {
                  outputType.fields.forEach((field) => {
                    writer.write(`${field.name}: `);

                    if (field.outputType.type === 'Json') {
                      return writer
                        .write(`JsonValue`)
                        .conditionalWrite(field.outputType.isList, `.array()`)
                        .conditionalWrite(
                          !field.outputType.isList && field.isNullable,
                          `.nullable()`,
                        )
                        .write(`,`)
                        .newLine();
                    }

                    if (field.outputType.type === 'Bytes') {
                      return writer
                        .write(`z.instanceof(Buffer)`)
                        .conditionalWrite(field.outputType.isList, `.array()`)
                        .conditionalWrite(
                          !field.outputType.isList && field.isNullable,
                          `.nullable()`,
                        )
                        .write(`,`)
                        .newLine();
                    }

                    if (field.outputType.type === 'Decimal') {
                      return writer
                        .write(`z.instanceof(`)
                        .conditionalWrite(
                          dmmf.generatorConfig.useDecimalJs,
                          `Decimal`,
                        )
                        .conditionalWrite(
                          !dmmf.generatorConfig.useDecimalJs,
                          `PrismaClient.Prisma.Decimal`,
                        )
                        .write(`)`)
                        .conditionalWrite(field.outputType.isList, `.array()`)
                        .conditionalWrite(
                          !field.outputType.isList && field.isNullable,
                          `.nullable()`,
                        )
                        .write(`,`)
                        .newLine();
                    }

                    const type =
                      PRISMA_TO_ZOD_TYPE_MAP[
                        field.outputType.type as ZodPrismaScalarType
                      ];

                    return writer
                      .conditionalWrite(!!type, `z.${type}()`)
                      .conditionalWrite(
                        !type,
                        `z.lazy(() => ${field.outputType.type}Schema)`,
                      )
                      .conditionalWrite(field.outputType.isList, `.array()`)
                      .conditionalWrite(
                        !field.outputType.isList && field.isNullable,
                        `.nullable()`,
                      )
                      .write(`,`)
                      .newLine();
                  });
                });
                writer.write(`)`).write(`.strict()`);
              },
            },
          ],
        }),
      );
    });

  return statements;
};
