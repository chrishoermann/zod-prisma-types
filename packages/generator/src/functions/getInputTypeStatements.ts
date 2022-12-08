/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

export const getInputTypeStatements: GetStatements = (dmmf) => {
  if (!dmmf.createInputTypes()) return [];

  // GENERATE INPUT TYPES
  // ---------------------------------------------------------------------

  const statements: Statement[] = [writeHeading(`INPUT TYPES`, 'FAT')];

  dmmf.schema.inputObjectTypes.prisma.forEach((inputType) => {
    statements.push(
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `${inputType.name}Schema`,
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
                    zodCustomValidatorString,
                  } = field;

                  if (field.hasMultipleTypes) {
                    writer.write(`z.union([ `);

                    field.inputTypes.forEach((inputType, idx) => {
                      const writeComma = idx !== field.inputTypes.length - 1;
                      writeScalarType(writer, {
                        inputType,
                        zodCustomErrors,
                        zodValidatorString,
                        zodCustomValidatorString,
                        writeComma,
                        writeValidation: dmmf.addInputTypeValidation(),
                      });
                      writeNonScalarType(writer, {
                        inputType,
                        writeComma,
                      });
                      writeSpecialType(writer, {
                        inputType,
                        zodCustomErrors,
                        zodCustomValidatorString,
                        writeComma,
                        useDecimalJS: dmmf.useDecimalJs(),
                        writeValidation: dmmf.addInputTypeValidation(),
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
                      zodCustomValidatorString,
                      writeValidation: dmmf.addInputTypeValidation(),
                    });
                    writeNonScalarType(writer, {
                      inputType,
                      isNullable,
                      isOptional,
                    });
                    writeSpecialType(writer, {
                      inputType,
                      zodCustomErrors,
                      zodCustomValidatorString,
                      isNullable,
                      isOptional,
                      useDecimalJS: dmmf.useDecimalJs(),
                      writeValidation: dmmf.addInputTypeValidation(),
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
