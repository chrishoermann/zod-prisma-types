import { GetStatements, Statement } from '../types';
import {
  writeConstStatement,
  writeHeading,
  writeNonScalarType,
  writeSpecialType,
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

                    field.inputTypes.forEach((inputType, idx) => {
                      const writeComma = idx !== field.inputTypes.length - 1;
                      writeScalarType(writer, {
                        inputType,
                        zodCustomErrors,
                        zodValidatorString,
                        writeComma,
                      });
                      writeSpecialType(writer, {
                        inputType,
                        zodCustomErrors,
                        writeComma,
                      });
                      writeNonScalarType(writer, {
                        inputType,
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
                      isNullable,
                      isOptional,
                      zodCustomErrors,
                      zodValidatorString,
                    });
                    writeSpecialType(writer, {
                      inputType,
                      zodCustomErrors,
                      isNullable,
                      isOptional,
                    });
                    writeNonScalarType(writer, {
                      inputType,
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

  return statements;
};
