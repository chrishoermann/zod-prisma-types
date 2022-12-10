import { GetStatements, Statement } from '../types';
import {
  writeConstStatement,
  writeHeading,
  writeNonScalarType,
  writeScalarType,
  writeSpecialType,
} from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getArgTypeStatements: GetStatements = (dmmf) => {
  if (!dmmf.createInputTypes()) return [];

  const statements: Statement[] = [writeHeading(`ARGS`, 'FAT')];

  dmmf.schema.outputObjectTypes.prisma
    .filter((type) => type.name === 'Query' || type.name === 'Mutation')
    .forEach((outputType) => {
      outputType.prismaActionFields.forEach((field) => {
        statements.push(
          writeConstStatement({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
              {
                name: `${field.argName}Schema`,
                type: `z.ZodType<PrismaClient.Prisma.${field.argName}>`,
                initializer: (writer) => {
                  writer.write(`z.object(`);
                  writer.inlineBlock(() => {
                    writer
                      .writeLine(
                        `select: z.lazy(() => ${field.modelType}SelectSchema).optional(),`,
                      )
                      .conditionalWriteLine(
                        field.linkedModel?.hasRelationFields,
                        `include: z.lazy(() => ${field.modelType}IncludeSchema).optional(),`,
                      );
                    field.args.forEach((arg) => {
                      writer.write(`${arg.name}: `);

                      const { isOptional, isNullable } = arg;

                      if (arg.hasMultipleTypes) {
                        writer.write(`z.union([ `);

                        arg.inputTypes.forEach((inputType, idx) => {
                          const writeComma = idx !== arg.inputTypes.length - 1;

                          writeScalarType(writer, {
                            inputType,
                            writeLazy: false,
                            writeComma,
                          });
                          writeNonScalarType(writer, {
                            inputType,
                            writeLazy: false,
                            writeComma,
                          });
                          writeSpecialType(writer, {
                            useDecimalJS: dmmf.useDecimalAsNumber(),
                            inputType,
                            writeLazy: false,
                            writeComma,
                          });
                        });

                        writer
                          .write(` ])`)
                          .conditionalWrite(arg.isOptional, `.optional()`)
                          .conditionalWrite(arg.isNullable, `.nullable()`)
                          .write(`,`);
                      } else {
                        writeScalarType(writer, {
                          inputType: arg.inputTypes[0],
                          writeLazy: false,
                          isNullable,
                          isOptional,
                        });
                        writeNonScalarType(writer, {
                          inputType: arg.inputTypes[0],
                          writeLazy: false,
                          isNullable,
                          isOptional,
                        });
                        writeSpecialType(writer, {
                          useDecimalJS: dmmf.useDecimalAsNumber(),
                          inputType: arg.inputTypes[0],
                          writeLazy: false,
                          isNullable,
                          isOptional,
                        });
                      }

                      writer.newLine();
                    });
                  });
                  writer.write(`)`).write(`.strict()`);
                },
              },
            ],
          }),
        );
      });
    });

  return statements;
};
