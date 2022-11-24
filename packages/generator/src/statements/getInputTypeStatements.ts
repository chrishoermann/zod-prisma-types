/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CodeBlockWriter } from 'ts-morph';

import { ExtendedDMMFSchemaArgInputType, FormattedNames } from '../classes';
import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

/////////////////////////////////////////////////
// TYPES & INTERFACES
/////////////////////////////////////////////////

interface WriteScalarTypeOptions {
  inputType: ExtendedDMMFSchemaArgInputType;
  zodValidatorString?: string;
  zodCustomErrors?: string;
}

/////////////////////////////////////////////////
// HELPER
/////////////////////////////////////////////////

const writeScalarType = (
  writer: CodeBlockWriter,
  { inputType, zodCustomErrors, zodValidatorString }: WriteScalarTypeOptions,
) => {
  const zodType = inputType.getZodScalarType();
  if (!zodType) return;

  writer
    .write(`z.${zodType}(`)
    .conditionalWrite(!!zodCustomErrors, zodCustomErrors!)
    .write(`)`)
    .conditionalWrite(!!zodValidatorString, zodValidatorString!)
    .conditionalWrite(inputType.isList, `.array()`)
    .write(`,`);
};

const writeNonScalarType = (
  writer: CodeBlockWriter,
  inputType: ExtendedDMMFSchemaArgInputType,
) => {
  const nonScalarType = inputType.getZodNonScalarType();
  if (!nonScalarType) return;

  writer
    .write(`z.lazy(() => ${nonScalarType})`)
    .conditionalWrite(inputType.isList, `.array()`)
    .write(`,`);
};

const writeNullType = (
  writer: CodeBlockWriter,
  inputType: ExtendedDMMFSchemaArgInputType,
) => {
  const nullType = inputType.getZodNullType();
  if (!nullType) return;

  writer.write(`z.${nullType}(),`);
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

                  const inputTypes = field.inputTypes.filter(
                    (type) => type.type !== 'Null',
                  );

                  if (inputTypes.length > 1) {
                    writer.write(`z.union([ `);

                    inputTypes.forEach((inputType) => {
                      writeScalarType(writer, {
                        inputType,
                        zodCustomErrors: field.zodCustomErrors,
                        zodValidatorString: field.zodValidatorString,
                      });

                      writeNonScalarType(writer, inputType);
                      writeNullType(writer, inputType);
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
                      zodCustomErrors: field.zodCustomErrors,
                      zodValidatorString: field.zodValidatorString,
                    });
                    writeNonScalarType(writer, inputType);
                    writeNullType(writer, inputType);
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

  // console.log(
  //   'outputObjectTypes',
  //   schema.outputObjectTypes.prisma[0].fields[0],
  // );

  schema.outputObjectTypes.prisma
    .filter((type) => type.name === 'Query' || type.name === 'Mutation')
    .forEach((outputType) => {
      outputType.fields.forEach((field) => {
        const { formattedNames } = new FormattedNames(field.name);

        console.log('field', field);

        // const replaceRegex = new RegExp(field.outputType.type as string);

        const name = `${
          field.outputType.type
        }${formattedNames.pascalCase.replace(
          field.outputType.type as string,
          '',
        )}Args`;

        argsStatements.push(
          writeConstStatement({
            leadingTrivia: (writer) => writer.newLine(),
            declarations: [
              {
                name: `${name}`,
                type: `z.ZodType<Prisma.Prisma.${name}>`,
                initializer: (writer) => {
                  writer.write(`z.object(`);
                  writer.inlineBlock(() => {
                    // outputType.fields.forEach((field) => {
                    //   writer.write(`${field.name}: `);
                    //   const inputTypes = field.inputTypes.filter(
                    //     (type) => type.type !== 'Null',
                    //   );
                    //   if (inputTypes.length > 1) {
                    //     writer.write(`z.union([ `);
                    //     inputTypes.forEach((inputType) => {
                    //       writeScalarType(writer, {
                    //         inputType,
                    //         zodCustomErrors: field.zodCustomErrors,
                    //         zodValidatorString: field.zodValidatorString,
                    //       });
                    //       writeNonScalarType(writer, inputType);
                    //       writeNullType(writer, inputType);
                    //     });
                    //     writer
                    //       .write(` ])`)
                    //       .conditionalWrite(!field.isRequired, `.optional()`)
                    //       .conditionalWrite(field.isNullable, `.nullable()`)
                    //       .write(`,`);
                    //   } else {
                    //     const inputType = field.inputTypes[0];
                    //     writeScalarType(writer, {
                    //       inputType,
                    //       zodCustomErrors: field.zodCustomErrors,
                    //       zodValidatorString: field.zodValidatorString,
                    //     });
                    //     writeNonScalarType(writer, inputType);
                    //     writeNullType(writer, inputType);
                    //   }
                    //   writer.newLine();
                    // });
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
