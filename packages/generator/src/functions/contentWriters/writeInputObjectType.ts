import CodeBlockWriter from 'code-block-writer';

import { writeNonScalarType, writeScalarType, writeSpecialType } from '..';
import { ExtendedDMMFInputType, ExtendedDMMFSchemaArg } from '../../classes';
import { type ContentWriterOptions } from '../../types';
import { getConfig } from '../../config';

/////////////////////////////////////////////
// INTERFACE
/////////////////////////////////////////////

interface WriteInputTypeFieldOptions {
  writer: CodeBlockWriter;
  field: ExtendedDMMFSchemaArg;
  writeComma?: boolean;
  writeValidation?: boolean;
}

/////////////////////////////////////////////
// MAIN FUNCTION
/////////////////////////////////////////////

export const writeInputObjectType = (
  {
    fileWriter: { writer, writeImportSet, writeImport },
    getSingleFileContent = false,
  }: ContentWriterOptions,
  inputType: ExtendedDMMFInputType,
) => {
  const {
    useMultipleFiles,
    useExactOptionalPropertyTypes,
    addInputTypeValidation,
    useTypeAssertions,
    zodVersion,
  } = getConfig();

  if (useMultipleFiles && !getSingleFileContent) {
    writeImportSet(inputType.imports);
    if (useExactOptionalPropertyTypes) {
      writeImport('ru', `./RemoveUndefined`);
    }
  }

  // when an omit field is present, the type is not a native prism type
  // but a zod union of the native type and an omit type
  const type = inputType.hasOmitFields()
    ? `z.ZodType<Omit<Prisma.${
        inputType.name
      }, ${inputType.getOmitFieldsUnion()}>>`
    : `z.ZodType<Prisma.${inputType.name}>`;

  writer.blankLine().write(`export const ${inputType.name}Schema: ${type} = `);

  const { extendedWhereUniqueFields } = inputType;

  const writeExtendedWhereUniqueInput =
    Array.isArray(extendedWhereUniqueFields) &&
    extendedWhereUniqueFields.length !== 0;

  if (writeExtendedWhereUniqueInput) {
    // if only one element is present in the array,
    // a z.object is used instead of a z.union
    if (extendedWhereUniqueFields.length === 1) {
      writer
        .write(`z.object(`)
        .inlineBlock(() => {
          extendedWhereUniqueFields[0].forEach((field, idx) => {
            writeInputTypeField({
              writer,
              field,
              writeComma: idx !== extendedWhereUniqueFields[0].length - 1,
              writeValidation: addInputTypeValidation,
            });
          });
        })
        .write(`)`)
        .newLine()
        .write(`.and(`);
    } else {
      // now we need the union of z.objects
      writer
        .write(`z.union([`)
        .newLine()
        .withIndentationLevel(1, () => {
          extendedWhereUniqueFields.forEach((field) => {
            writer
              .write(`z.object(`)
              .inlineBlock(() => {
                field.forEach((field, idx) => {
                  writeInputTypeField({
                    writer,
                    field,
                    writeComma: idx !== extendedWhereUniqueFields[0].length - 1,
                    writeValidation: addInputTypeValidation,
                  });
                });
              })
              .write(`),`)
              .newLine();
          });
        })
        .writeLine(`])`)
        .write(`.and(`);
    }
  }

  writer
    .conditionalWrite(Number(zodVersion?.major) >= 4, `z.strictObject(`)
    .conditionalWrite(Number(zodVersion?.major) < 4, `z.object(`)
    .inlineBlock(() => {
      inputType.fields.forEach((field) => {
        writeInputTypeField({
          writer,
          field,
          writeValidation: addInputTypeValidation,
          writeComma: field !== inputType.fields[inputType.fields.length - 1],
        });
      });
    })
    .write(`)`)
    .conditionalWrite(Number(zodVersion?.major) < 4, `.strict()`)
    .conditionalWrite(useExactOptionalPropertyTypes, '.transform(ru)')
    .conditionalWrite(writeExtendedWhereUniqueInput, `)`)
    .conditionalWrite(useTypeAssertions, ` as ${type};`)
    .conditionalWrite(!useTypeAssertions, `;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${inputType.name}Schema;`);
  }
};

const writeInputTypeField = ({
  writer,
  field,
  writeValidation = false,
}: WriteInputTypeFieldOptions) => {
  const { zodCustomErrors, zodValidatorString, zodCustomValidatorString } =
    field;

  if (field.zodOmitField) {
    writer.write(`// omitted: `);
  }

  writer
    .write(`${field.name}: `)
    .conditionalWrite(field.hasMultipleTypes, `z.union([ `);

  field.inputTypes.forEach((inputType, idx) => {
    const writeComma = idx !== field.inputTypes.length - 1;

    writeScalarType(writer, {
      inputType,
      zodCustomErrors,
      zodValidatorString,
      zodCustomValidatorString,
      writeComma,
      writeValidation,

      // is a bit of a hacky workaround because in some cases the zodValidatorString is not set
      // (due to missing linkedField) but the field is a top level validator.
      // so we need to fallback to the standard type e.g. z.string()
      isTopLevelValidator:
        Boolean(field.zodValidatorString) &&
        field.linkedField?.isTopLevelValidator,
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
      writeValidation,
    });
  });

  writer
    .conditionalWrite(field.hasMultipleTypes, ` ])`)
    .conditionalWrite(field.isOptional, `.optional()`)
    .conditionalWrite(field.isNullable, `.nullable()`)
    .write(`,`)
    .newLine();
};
