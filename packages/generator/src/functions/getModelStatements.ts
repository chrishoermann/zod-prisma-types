/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ExtendedDMMF, ExtendedDMMFField, ExtendedDMMFModel } from '../classes';
import { CodeBlockWriter } from 'ts-morph';

import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading, writeJsDoc } from '../utils';

/////////////////////////////////////////////
// TYPES & INTERFACES
/////////////////////////////////////////////

interface WriteFieldOptions {
  writer: CodeBlockWriter;
  field: ExtendedDMMFField;
  writeOptionalDefaults?: boolean;
}

interface ExtendedWriteFieldOptions extends WriteFieldOptions {
  model: ExtendedDMMFModel;
  dmmf: ExtendedDMMF;
}

/////////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////////

// WRITE ADDITIONAL ZOD MODIFIERS
// ------------------------------------------

/**
 * Writes all relevant additional zod modifiers like`.nullish().array().optional()` to a field
 */
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

// WRITE CUSTOM VALIDATOR
// ------------------------------------------

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

// WRITE ENUM
// ------------------------------------------

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

// WRITE JSON
// ------------------------------------------

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

// WRITE OBJECT
// ------------------------------------------

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

// WRITE DECIMAL
// ------------------------------------------

const writeDecimal = ({
  writer,
  field,
  model,
  writeOptionalDefaults = false,
}: ExtendedWriteFieldOptions) => {
  writer
    .conditionalWrite(field.omitInModel(), '// omitted: ')
    .write(`${field.formattedNames.original}: `)
    .write(`z.union([`)
    .write(`z.number(),`)
    .write(`z.string(),`)
    .write(`z.instanceof(PrismaClient.Prisma.Decimal),`)
    .write(`DecimalJSLikeSchema,`)
    .write(`]`)
    .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)
    .write(`)`)
    .write(`.refine((v) => isValidDecimalInput(v),`)
    .write(
      ` { message: 'Field "${field.formattedNames.original}" must be a Decimal', `,
    )
    .write(`path: ['Models', '${model.formattedNames.original}']`)
    .write(` })`);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};

// WRITE DECIMAL WITH INSTANCE OF
// ------------------------------------------

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

// WRITE SCALARS
// ------------------------------------------

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
    // .conditionalWrite(field.isIntField() && !field.zodValidatorString, `.int()`)
    .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString!);

  writeFieldAdditions({ writer, field, writeOptionalDefaults });
};

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getModelStatements: GetStatements = (dmmf) => {
  if (!dmmf.generatorConfig.createModelTypes) return [];

  const statements: Statement[] = [writeHeading(`MODELS`, 'FAT')];

  dmmf.datamodel.models.forEach((model) => {
    // write standard model that represents the model type from prismas "index.d.ts"
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

    // check if a schema where fields with default values are optional should be generated
    if (model.writeOptionalDefaultValuesTypes()) {
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
                    if (!field.isOptionalDefaultField()) return;

                    const options = {
                      writer,
                      field,
                      writeOptionalDefaults: true,
                    };

                    if (field.zodCustomValidatorString) {
                      return writeCustomValidator(options);
                    }

                    if (field.kind === 'enum') {
                      return writeEnum(options);
                    }

                    if (field.isJsonType) {
                      return writeJson(options);
                    }

                    if (field.isBytesType) {
                      return writeBytes(options);
                    }

                    if (
                      field.isDecimalType &&
                      !dmmf.useInstanceOfForDecimal()
                    ) {
                      return writeDecimal({ ...options, model, dmmf });
                    }

                    if (field.isDecimalType && dmmf.useInstanceOfForDecimal()) {
                      return writeDecimalInstance({ ...options, model, dmmf });
                    }

                    return writeScalar(options);
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
