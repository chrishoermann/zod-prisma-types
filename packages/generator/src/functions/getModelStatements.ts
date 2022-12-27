/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ExtendedDMMF,
  ExtendedDMMFField,
  ExtendedDMMFModel,
} from 'src/classes';
import { CodeBlockWriter } from 'ts-morph';

import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading, writeJsDoc } from '../utils';

interface WriteFieldOptions {
  writer: CodeBlockWriter;
  field: ExtendedDMMFField;
  writeOptionalDefaults?: boolean;
}

interface ExtendedWriteFieldOptions extends WriteFieldOptions {
  model: ExtendedDMMFModel;
  dmmf: ExtendedDMMF;
}

const writeFieldAdditions = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  writer
    .conditionalWrite(field.isList, `.array()`)
    .conditionalWrite(
      field.isNullable && !field.isOptionalOnDefaultValue,
      `.nullish()`,
    )
    .conditionalWrite(
      writeOptionalDefaults && field.isOptionalOnDefaultValue,
      `.optional()`,
    )
    .write(`,`)
    .newLine();
};

const writeCustomValidator = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .write(field.zodCustomValidatorString!);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};

const writeEnum = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .write(`${field.zodType}Schema`);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};

const writeJson = ({ writer, field }: WriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .conditionalWrite(field.isRequired, `InputJsonValue`)
    .conditionalWrite(!field.isRequired, `NullableJsonValue`)
    .conditionalWrite(field.isList, `.array()`)
    .conditionalWrite(!field.isRequired, `.optional()`)
    .write(`,`)
    .newLine();
};

const writeBytes = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .write(`z.instanceof(Buffer)`);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};

const writeDecimal = ({
  writer,
  field,
  model,
  writeOptionalDefaults = false,
}: ExtendedWriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .write(`z.number(`)
    .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
    .write(`)`)
    .write(`.refine((v) => `)
    .write(`PrismaClient.Prisma.Decimal.isDecimal(v),`)
    .write(
      ` { message: 'Field "${field.formattedNames.original}" must be a Decimal', `,
    )
    .write(`path: ['Models', '${model.formattedNames.original}']`)
    .write(` })`);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};

const writeDecimalInstance = ({
  writer,
  field,
  dmmf,
  writeOptionalDefaults = false,
}: ExtendedWriteFieldOptions) => {
  if (dmmf.useInstanceOfForDecimal()) {
    writer
      .conditionalWrite(field.omitInModel(), '// omitted: ')
      .write(`${field.formattedNames.original}: `)
      .write(`z.instanceof(PrismaClient.Prisma.Decimal)`);

    writeFieldAdditions({ writer, field, writeOptionalDefaults });
  }
};

const writeScalar = ({
  writer,
  field,
  writeOptionalDefaults = false,
}: WriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .write(`z.${field.zodType}(`)
    .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
    .write(`)`)
    .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString!);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};

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
                  return writeCustomValidator({ writer, field });
                }

                if (field.kind === 'enum') {
                  return writeEnum({ writer, field });
                }

                if (field.isJsonType) {
                  return writeJson({ writer, field });
                }

                if (field.isBytesType) {
                  return writeBytes({ writer, field });
                }

                if (field.isDecimalType && !dmmf.useInstanceOfForDecimal()) {
                  return writeDecimal({ writer, field, model, dmmf });
                }

                if (field.isDecimalType && dmmf.useInstanceOfForDecimal()) {
                  return writeDecimalInstance({ writer, field, model, dmmf });
                }

                return writeScalar({ writer, field });
              });
              writer.write(`})`);
            },
          },
        ],
      }),
    );

    if (dmmf.generatorConfig.defaultValuesOptionalInModel) {
      statements.push(
        writeConstStatement({
          leadingTrivia: (writer) => {
            writer.newLine();
            writeJsDoc(writer, model.documentation);
          },
          declarations: [
            {
              name: `${model.formattedNames.original}OptionalDefaultsSchema`,
              initializer(writer) {
                writer.writeLine(
                  `${model.formattedNames.original}Schema.merge(`,
                );
                writer.write(`z.object({`);
                [...model.enumFields, ...model.scalarFields].forEach(
                  (field) => {
                    if (!field.hasDefaultValue) return;

                    const writeOptionalDefaults = field.hasDefaultValue;

                    if (field.zodCustomValidatorString) {
                      return writeCustomValidator({
                        writer,
                        field,
                        writeOptionalDefaults,
                      });
                    }

                    if (field.kind === 'enum') {
                      return writeEnum({
                        writer,
                        field,
                        writeOptionalDefaults,
                      });
                    }

                    if (field.isJsonType) {
                      return writeJson({
                        writer,
                        field,
                        writeOptionalDefaults,
                      });
                    }

                    if (field.isBytesType) {
                      return writeBytes({
                        writer,
                        field,
                        writeOptionalDefaults,
                      });
                    }

                    if (
                      field.isDecimalType &&
                      !dmmf.useInstanceOfForDecimal()
                    ) {
                      return writeDecimal({
                        writer,
                        field,
                        writeOptionalDefaults,
                        model,
                        dmmf,
                      });
                    }

                    if (field.isDecimalType && dmmf.useInstanceOfForDecimal()) {
                      return writeDecimalInstance({
                        writer,
                        field,
                        writeOptionalDefaults,
                        model,
                        dmmf,
                      });
                    }

                    return writeScalar({
                      writer,
                      field,
                      writeOptionalDefaults,
                    });
                  },
                );
                writer.writeLine(`})`).write(`)`);
              },
            },
          ],
        }),
      );
    }
  });

  return statements;
};
