/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CodeBlockWriter } from 'ts-morph';

import { ExtendedDMMFSchemaArgInputType } from '../classes';
import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

/////////////////////////////////////////////////
// TYPES & INTERFACES
/////////////////////////////////////////////////

interface WriteTypeOptions {
  inputType: ExtendedDMMFSchemaArgInputType;
  isOptional?: boolean;
  isNullable?: boolean;
  writeLazy?: boolean;
  zodValidatorString?: string;
  zodCustomErrors?: string;
}

/////////////////////////////////////////////////
// HELPER
/////////////////////////////////////////////////

/**
 * Checks if a type is a scalar type.
 * If yes, it writes the type.
 * If no, it writes the non-scalar type.
 * @param writer CodeBlockWriter
 * @param param1 options
 * @returns void
 */
const writeScalarType = (
  writer: CodeBlockWriter,
  {
    inputType,
    isOptional,
    isNullable,
    zodCustomErrors,
    zodValidatorString,
  }: WriteTypeOptions,
) => {
  const zodType = inputType.getZodScalarType();
  if (!zodType) return;

  writer
    .write(`z.${zodType}(`)
    .conditionalWrite(!!zodCustomErrors, zodCustomErrors!)
    .write(`)`)
    .conditionalWrite(!!zodValidatorString, zodValidatorString!)
    .conditionalWrite(inputType.isList, `.array()`)
    .conditionalWrite(isOptional, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .write(`,`);
};

const writeNonScalarType = (
  writer: CodeBlockWriter,
  { inputType, isOptional, isNullable, writeLazy = true }: WriteTypeOptions,
) => {
  const nonScalarType = inputType.getZodNonScalarType();
  if (!nonScalarType) return;

  writer
    .conditionalWrite(writeLazy, `z.lazy(() => ${nonScalarType})`)
    .conditionalWrite(!writeLazy, `${nonScalarType}`)
    .conditionalWrite(inputType.isList, `.array()`)
    .conditionalWrite(isOptional, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .write(`,`);
};

const writeNullType = (
  writer: CodeBlockWriter,
  { inputType, isOptional: isRequired, isNullable }: WriteTypeOptions,
) => {
  const nullType = inputType.getZodNullType();
  if (!nullType) return;

  writer
    .write(`z.${nullType}(),`)
    .conditionalWrite(!isRequired, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .write(`,`);
};

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getInputTypeStatements: GetStatements = (DMMF) => {
  const { schema, datamodel } = DMMF;

  // GENERATE ENUM
  // ---------------------------------------------------------------------
  const enumStatements: Statement[] = [writeHeading(`ENUMS`, 'FAT')];

  schema.enumTypes.prisma.forEach((enumType) => {
    const enumName = enumType.name;

    enumStatements.push(
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `${enumName}`,
            initializer(writer) {
              writer.write(`z.nativeEnum(Prisma.Prisma.${enumName})`);
            },
          },
        ],
      }),
    );
  });

  datamodel.enums.forEach(({ formattedNames }) => {
    enumStatements.push(
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `${formattedNames.pascalCase}`,
            initializer(writer) {
              writer.write(`z.nativeEnum(Prisma.${formattedNames.pascalCase})`);
            },
          },
        ],
      }),
    );
  });

  // GENERATE TYPES
  // ---------------------------------------------------------------------

  const typesStatements: Statement[] = [writeHeading(`INPUT TYPES`, 'FAT')];

  schema.inputObjectTypes.prisma.forEach((inputType) => {
    typesStatements.push(
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
                    field.inputTypes.forEach((inputType) => {
                      writeScalarType(writer, {
                        inputType,
                        zodCustomErrors,
                        zodValidatorString,
                        writeLazy: true,
                      });
                      writeNonScalarType(writer, {
                        inputType,
                        zodCustomErrors,
                        zodValidatorString,
                        writeLazy: true,
                      });
                      writeNullType(writer, {
                        inputType,
                        zodCustomErrors,
                        zodValidatorString,
                        writeLazy: true,
                      });
                    });

                    writer
                      .write(` ])`)
                      .conditionalWrite(!field.isRequired, `.optional()`)
                      .conditionalWrite(field.isNullable, `.nullable()`)
                      .write(`,`);
                  } else {
                    writeScalarType(writer, {
                      inputType: field.inputTypes[0],
                      writeLazy: false,
                      isNullable,
                      isOptional,
                      zodCustomErrors,
                      zodValidatorString,
                    });
                    writeNonScalarType(writer, {
                      inputType: field.inputTypes[0],
                      writeLazy: true, // here the type needs to be wrapped in a z.lazy
                      isNullable,
                      isOptional,
                      zodCustomErrors,
                      zodValidatorString,
                    });
                    writeNullType(writer, {
                      inputType: field.inputTypes[0],
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

  const argsStatements: Statement[] = [writeHeading(`ARGS`, 'FAT')];

  schema.outputObjectTypes.prisma
    .filter((type) => type.name === 'Query' || type.name === 'Mutation')
    .forEach((outputType) => {
      outputType.fields.forEach((field) => {
        argsStatements.push(
          writeConstStatement({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
              {
                name: `${field.argName}`,
                type: `z.ZodType<Prisma.Prisma.${field.argName}>`,
                initializer: (writer) => {
                  writer.write(`z.object(`);
                  writer.inlineBlock(() => {
                    field.args.forEach((arg) => {
                      writer.write(`${arg.name}: `);

                      const { isOptional, isNullable } = arg;

                      // console.log(JSON.stringify(arg, null, 2));

                      if (arg.hasMultipleTypes) {
                        writer.write(`z.union([ `);

                        // don't pass optional and nullable props in this loop
                        // because they are handled by the union
                        arg.inputTypes.forEach((inputType) => {
                          writeScalarType(writer, {
                            inputType,
                            writeLazy: false,
                          });
                          writeNonScalarType(writer, {
                            inputType,
                            writeLazy: false,
                          });
                          writeNullType(writer, {
                            inputType,
                            writeLazy: false,
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
                        writeNullType(writer, {
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

  return [...enumStatements, ...typesStatements, ...argsStatements];
};
