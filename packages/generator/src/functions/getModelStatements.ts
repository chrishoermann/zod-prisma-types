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
                    .conditionalWrite(field.isNullable, `.nullish()`)
                    .write(`,`)
                    .newLine();
                }

                if (field.kind === 'enum') {
                  return writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(`${field.formattedNames.original}: `)
                    .write(`${field.zodType}Schema`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(field.isNullable, `.nullish()`)
                    .write(`,`)
                    .newLine();
                }

                if (field.isJsonType) {
                  return (
                    writer
                      .conditionalWrite(field.omitInModel(), '// omitted: ')
                      .write(`${field.formattedNames.original}: `)
                      .write(`JsonValue`)
                      .conditionalWrite(field.isList, `.array()`)
                      .conditionalWrite(!field.isRequired, `.optional()`)
                      // TODO: check out how to handle json null in the standard schema
                      // maybe the JsonValueSchema should include json null types and the
                      // nullable() here should be removed or JsonValueSchema should not
                      // include null types and the json null values are handled here.

                      // maybe in JsonValueSchema the JsonNullValueFilterSchema should be
                      // added to the union type and the nullable() should be removed

                      // .conditionalWrite(field.isNullable, `.nullable()`)

                      .write(`,`)
                      .newLine()
                  );
                }

                if (field.isBytesType) {
                  return writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(`${field.formattedNames.original}: `)
                    .write(`z.instanceof(Buffer)`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(field.isNullable, `.nullish()`)
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
                    .conditionalWrite(field.isNullable, `.nullish()`)
                    .write(`,`)
                    .newLine();
                }

                if (field.isDecimalType && dmmf.useInstanceOfForDecimal()) {
                  return writer
                    .conditionalWrite(field.omitInModel(), '// omitted: ')
                    .write(`${field.formattedNames.original}: `)
                    .write(`z.instanceof(PrismaClient.Prisma.Decimal)`)
                    .conditionalWrite(field.isList, `.array()`)
                    .conditionalWrite(field.isNullable, `.nullish()`)
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
                  .conditionalWrite(field.isNullable, `.nullish()`)
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
