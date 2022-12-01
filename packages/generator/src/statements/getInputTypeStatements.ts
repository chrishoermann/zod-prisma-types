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
  writeComma?: boolean;
  zodValidatorString?: string;
  zodCustomErrors?: string;
}

/////////////////////////////////////////////////
// HELPER
/////////////////////////////////////////////////

/**
 * Checks if a type is a scalar type.
 * If yes, it writes the type.
 * If no, it returns undefined.
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
    writeComma = true,
    zodCustomErrors,
    zodValidatorString,
  }: WriteTypeOptions,
) => {
  const zodType = inputType.getZodScalarType();
  if (!zodType) return;

  return writer
    .write(`z.${zodType}(`)
    .conditionalWrite(!!zodCustomErrors, zodCustomErrors!)
    .write(`)`)
    .conditionalWrite(!!zodValidatorString, zodValidatorString!)
    .conditionalWrite(inputType.isList, `.array()`)
    .conditionalWrite(isOptional, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .conditionalWrite(writeComma, `,`);
};

const writeNonScalarType = (
  writer: CodeBlockWriter,
  {
    inputType,
    isOptional,
    isNullable,
    writeLazy = true,
    writeComma = true,
  }: WriteTypeOptions,
) => {
  const nonScalarType = inputType.getZodNonScalarType();
  if (!nonScalarType) return;

  return writer
    .conditionalWrite(writeLazy, `z.lazy(() => ${nonScalarType})`)
    .conditionalWrite(!writeLazy, `${nonScalarType}`)
    .conditionalWrite(inputType.isList, `.array()`)
    .conditionalWrite(isOptional, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .conditionalWrite(writeComma, `,`);
};

const writeNullType = (
  writer: CodeBlockWriter,
  {
    inputType,
    isOptional: isRequired,
    isNullable,
    writeComma = true,
  }: WriteTypeOptions,
) => {
  const nullType = inputType.getZodNullType();
  if (!nullType) return;

  return writer
    .write(`z.${nullType}(),`)
    .conditionalWrite(!isRequired, `.optional()`)
    .conditionalWrite(isNullable, `.nullable()`)
    .conditionalWrite(writeComma, `,`);
};

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getInputTypeStatements: GetStatements = (DMMF) => {
  const { schema, datamodel } = DMMF;

  // PRISMA GENERATED ENUMS
  // ---------------------------------------------------------------------
  const enumStatements: Statement[] = [writeHeading(`ENUMS`, 'FAT')];

  enumStatements.push(writeHeading(`GENERATED ENUMS`, 'SLIM'));

  schema.enumTypes.prisma.forEach(
    ({ formattedNames, useNativeEnum, values }) => {
      if (useNativeEnum) {
        enumStatements.push(
          writeConstStatement({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
              {
                name: `${formattedNames.pascalCase}`,
                initializer(writer) {
                  writer.write(
                    `z.nativeEnum(Prisma.Prisma.${formattedNames.pascalCase})`,
                  );
                },
              },
            ],
          }),
        );
      } else {
        enumStatements.push(
          writeConstStatement({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
              {
                name: `${formattedNames.pascalCase}`,
                initializer(writer) {
                  writer.write(`z.enum([`);
                  values.forEach((value) => {
                    writer.write(`'${value}',`);
                  });
                  writer.write(`])`);
                },
              },
            ],
          }),
        );
      }
    },
  );

  enumStatements.push(writeHeading(`CUSTOM ENUMS`, 'SLIM'));

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

  // GENERATE HELPER TYPES
  // ---------------------------------------------------------------------

  const helperStatements: Statement[] = [];

  if (schema.hasJsonTypes) {
    helperStatements.push(
      writeHeading(`HELPER TYPES`, 'FAT'),
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `JsonValue`,
            type: 'z.ZodType<Prisma.Prisma.JsonValue>',
            initializer(writer) {
              writer.writeLine(`z.union([`);
              writer.writeLine(`z.string(),`);
              writer.writeLine(`z.number(),`);
              writer.writeLine(`z.boolean(),`);
              writer.writeLine(`z.lazy(() => z.array(JsonValue)),`);
              writer.writeLine(`z.lazy(() => z.record(JsonValue)),`);
              writer.write(`])`).write('.nullable()');
            },
          },
        ],
      }),
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `InputJsonValue`,
            type: 'z.ZodType<Prisma.Prisma.InputJsonValue>',
            initializer(writer) {
              writer.writeLine(`z.union([`);
              writer.writeLine(`z.string(),`);
              writer.writeLine(`z.number(),`);
              writer.writeLine(`z.boolean(),`);
              writer.writeLine(
                `z.lazy(() => z.array(InputJsonValue.nullable())),`,
              );
              writer.writeLine(
                `z.lazy(() => z.record(InputJsonValue.nullable())),`,
              );
              writer.write(`])`);
            },
          },
        ],
      }),
    );
  }

  // GENERATE MODELS
  // ---------------------------------------------------------------------

  const modelStatements: Statement[] = [writeHeading(`MODELS`, 'FAT')];

  datamodel.models.forEach((model) => {
    modelStatements.push(
      writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM'),
      writeConstStatement({
        leadingTrivia: (writer) => writer.newLine(),
        declarations: [
          {
            name: `${model.formattedNames.pascalCase}`,
            initializer(writer) {
              writer.write(`z.object({`);
              [...model.enumFields, ...model.scalarFields].forEach((field) => {
                if (field.kind === 'enum') {
                  return writer
                    .write(`${field.formattedNames.camelCase}: `)
                    .write(field.zodType)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(field.isNullable, `.nullable()`)
                    .write(`,`)
                    .newLine();
                }

                if (field.isJsonType) {
                  return writer
                    .write(`${field.formattedNames.camelCase}: `)
                    .write(`InputJsonValue`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(field.isNullable, `.nullable()`)
                    .write(`,`)
                    .newLine();
                }

                if (field.isBytesType) {
                  return writer
                    .write(`${field.formattedNames.camelCase}: `)
                    .write(`z.instanceof(Buffer)`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(field.isNullable, `.nullable()`)
                    .write(`,`)
                    .newLine();
                }

                return writer
                  .write(`${field.formattedNames.camelCase}: `)
                  .write(`z.${field.zodType}(`)
                  .conditionalWrite(
                    !!field.zodCustomErrors,
                    field.zodCustomErrors!,
                  )
                  .write(`)`)
                  .conditionalWrite(
                    !!field.zodValidatorString,
                    field.zodValidatorString!,
                  )
                  .conditionalWrite(field.isList, `.array()`)
                  .conditionalWrite(field.isNullable, `.nullable()`)
                  .write(`,`)
                  .newLine();
              });
              writer.write(`})`);
            },
          },
        ],
      }),
    );
  });

  // GENERATE SELECT TYPES
  // ---------------------------------------------------------------------

  const includeAndSelectStatements: Statement[] = [
    writeHeading(`SELECT & INCLUDE`, 'FAT'),
  ];

  datamodel.models.forEach((model) => {
    includeAndSelectStatements.push(
      writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM'),
    );

    if (model.hasRelationFields) {
      includeAndSelectStatements.push(
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

    includeAndSelectStatements.push(
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
      includeAndSelectStatements.push(
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

  // GENERATE INPUT TYPES
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

  // GENERATE ARG TYPES
  // ---------------------------------------------------------------------

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

                      // console.log(JSON.stringify(arg, null, 2));

                      if (arg.hasMultipleTypes) {
                        writer.write(`z.union([ `);

                        // don't pass optional and nullable props in this loop
                        // because they are handled by the union
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
                          writeNullType(writer, {
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

  return [
    ...enumStatements,
    ...helperStatements,
    ...includeAndSelectStatements,
    ...modelStatements,
    ...typesStatements,
    ...argsStatements,
  ];
};
