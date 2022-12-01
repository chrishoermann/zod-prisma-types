/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GetStatements, Statement } from '../types';
import {
  writeConstStatement,
  writeHeading,
  writeNonScalarType,
  writeNullType,
  writeScalarType,
} from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getInputTypeStatements: GetStatements = ({ schema }) => {
  // GENERATE INPUT TYPES
  // ---------------------------------------------------------------------

  const statements: Statement[] = [writeHeading(`INPUT TYPES`, 'FAT')];

  schema.inputObjectTypes.prisma.forEach((inputType) => {
    statements.push(
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `${inputType.name}`,
            type: `z.ZodType<Prisma.Prisma.${inputType.name}>`,
            initializer: (writer) => {
              writer.write(`z.object(`);
              writer.inlineBlock(() => {
                inputType.fields.forEach((field) => {
                  writer.write(`${field.name}: `);

                  const {
                    isNullable,
                    isOptional,
                    zodCustomErrors,
                    zodValidatorString,
                  } = field;

                  if (field.hasMultipleTypes) {
                    writer.write(`z.union([ `);

                    // don't pass optional and nullable props in this loop
                    // because they are handled by the union
                    field.inputTypes.forEach((inputType, idx) => {
                      const writeComma = idx !== field.inputTypes.length - 1;
                      writeScalarType(writer, {
                        inputType,
                        zodCustomErrors,
                        zodValidatorString,
                        // don't lazy load json types
                        // they are handled like scalars with "InputJsonValue" helper type
                        writeLazy: !field.isJsonType,
                        writeComma,
                      });
                      writeNonScalarType(writer, {
                        inputType,
                        zodCustomErrors,
                        zodValidatorString,
                        // don't lazy load json types
                        // they are handled like scalars with "InputJsonValue" helper type
                        writeLazy: !field.isJsonType,
                        writeComma,
                      });
                      writeNullType(writer, {
                        inputType,
                        zodCustomErrors,
                        zodValidatorString,
                        writeLazy: true,
                        writeComma,
                      });
                    });

                    writer
                      .write(` ])`)
                      .conditionalWrite(!field.isRequired, `.optional()`)
                      .conditionalWrite(field.isNullable, `.nullable()`)
                      .write(`,`);
                  } else {
                    const inputType = field.inputTypes[0];
                    writeScalarType(writer, {
                      inputType,
                      writeLazy: false,
                      isNullable,
                      isOptional,
                      zodCustomErrors,
                      zodValidatorString,
                    });
                    writeNonScalarType(writer, {
                      inputType,
                      // don't lazy load json types
                      // they are handled like scalars with "InputJsonValue" helper type
                      writeLazy: !field.isJsonType,
                      // writeLazy: true, // type needs to be wrapped in a z.lazy
                      isNullable,
                      isOptional,
                      zodCustomErrors,
                      zodValidatorString,
                    });
                    writeNullType(writer, {
                      inputType,
                      writeLazy: false,
                      isNullable,
                      isOptional,
                      zodCustomErrors,
                      zodValidatorString,
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

  return statements;
};
