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

export const getArgTypeStatements: GetStatements = ({ schema }) => {
  const statements: Statement[] = [writeHeading(`ARGS`, 'FAT')];

  schema.outputObjectTypes.prisma
    .filter((type) => type.name === 'Query' || type.name === 'Mutation')
    .forEach((outputType) => {
      outputType.fields.forEach((field) => {
        statements.push(
          writeConstStatement({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
              {
                name: `${field.argName}`,
                type: `z.ZodType<Prisma.Prisma.${field.argName}>`,
                initializer: (writer) => {
                  writer.write(`z.object(`);
                  writer.inlineBlock(() => {
                    writer
                      .writeLine(
                        `select: z.lazy(() => ${field.modelType}Select).optional(),`,
                      )
                      .conditionalWriteLine(
                        field.linkedModel?.hasRelationFields,
                        `include: z.lazy(() => ${field.modelType}Include).optional(),`,
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
