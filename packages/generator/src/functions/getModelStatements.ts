/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading, writeJsDoc } from '../utils';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getModelStatements: GetStatements = (dmmf) => {
  const statements: Statement[] = [writeHeading(`MODELS`, 'FAT')];

  dmmf.datamodel.models.forEach((model) => {
    statements.push(
      writeHeading(`${model.formattedNames.upperCaseSpace}`, 'SLIM'),
      writeConstStatement({
        leadingTrivia: (writer) => {
          writer.newLine();
          writeJsDoc(writer, model.documentation);
        },
        declarations: [
          {
            name: `${model.formattedNames.original}Schema`,
            initializer(writer) {
              writer.write(`z.object({`);
              [...model.enumFields, ...model.scalarFields].forEach((field) => {
                if (field.clearedDocumentation) {
                  writeJsDoc(writer, field.clearedDocumentation);
                }

                if (field.zodCustomValidatorString) {
                  return writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(`${field.formattedNames.original}: `)
                    .write(field.zodCustomValidatorString!)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(
                      field.isNullable && !field.isOptionalOnDefaultValue,
                      `.nullish()`,
                    )
                    .conditionalWrite(
                      field.isOptionalOnDefaultValue,
                      `.optional()`,
                    )
                    .write(`,`)
                    .newLine();
                }

                if (field.kind === 'enum') {
                  return writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(`${field.formattedNames.original}: `)
                    .write(`${field.zodType}Schema`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(
                      field.isNullable && !field.isOptionalOnDefaultValue,
                      `.nullish()`,
                    )
                    .conditionalWrite(
                      field.isOptionalOnDefaultValue,
                      `.optional()`,
                    )
                    .write(`,`)
                    .newLine();
                }

                if (field.isJsonType) {
                  return writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(`${field.formattedNames.original}: `)
                    .conditionalWrite(field.isRequired, `InputJsonValue`)
                    .conditionalWrite(!field.isRequired, `NullableJsonValue`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(!field.isRequired, `.optional()`)
                    .write(`,`)
                    .newLine();
                }

                if (field.isBytesType) {
                  return writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(`${field.formattedNames.original}: `)
                    .write(`z.instanceof(Buffer)`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(
                      field.isNullable && !field.isOptionalOnDefaultValue,
                      `.nullish()`,
                    )
                    .conditionalWrite(
                      field.isOptionalOnDefaultValue,
                      `.optional()`,
                    )
                    .write(`,`)
                    .newLine();
                }

                if (field.isDecimalType && !dmmf.useInstanceOfForDecimal()) {
                  return writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(`${field.formattedNames.original}: `)
                    .write(`z.number(`)
                    .conditionalWrite(
                      !!field.zodCustomErrors,
                      field.zodCustomErrors!,
                    )
                    .write(`)`)
                    .write(`.refine((v) => `)
                    .write(`PrismaClient.Prisma.Decimal.isDecimal(v),`)
                    .write(
                      ` { message: 'Field "${field.formattedNames.original}" must be a Decimal', `,
                    )
                    .write(
                      `path: ['Models', '${model.formattedNames.original}']`,
                    )
                    .write(` })`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(
                      field.isNullable && !field.isOptionalOnDefaultValue,
                      `.nullish()`,
                    )
                    .conditionalWrite(
                      field.isOptionalOnDefaultValue,
                      `.optional()`,
                    )
                    .write(`,`)
                    .newLine();
                }

                if (field.isDecimalType && dmmf.useInstanceOfForDecimal()) {
                  return writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(`${field.formattedNames.original}: `)
                    .write(`z.instanceof(PrismaClient.Prisma.Decimal)`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(
                      field.isNullable && !field.isOptionalOnDefaultValue,
                      `.nullish()`,
                    )
                    .conditionalWrite(
                      field.isOptionalOnDefaultValue,
                      `.optional()`,
                    )
                    .write(`,`)
                    .newLine();
                }

                return writer
                  .conditionalWrite(field.omitInModel(), '// omitted: ')
                  .write(`${field.formattedNames.original}: `)
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
                  .conditionalWrite(
                    field.isNullable && !field.isOptionalOnDefaultValue,
                    `.nullish()`,
                  )
                  .conditionalWrite(
                    field.isOptionalOnDefaultValue,
                    `.optional()`,
                  )
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

  return statements;
};
