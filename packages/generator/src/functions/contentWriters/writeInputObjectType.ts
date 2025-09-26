import CodeBlockWriter from 'code-block-writer';

import { writeNonScalarType, writeScalarType, writeSpecialType } from '..';
import {
  ExtendedDMMFInputType,
  ExtendedDMMFSchemaArg,
  ExtendedDMMFSchemaArgInputType,
} from '../../classes';
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

const isNonScalarType = (field: ExtendedDMMFSchemaArg) => {
  const zodTypeNonScalar = field.inputTypes[0].getZodNonScalarType();
  return !!zodTypeNonScalar;
};

/////////////////////////////////////////////
// MAIN FUNCTION
/////////////////////////////////////////////

export const writeInputObjectType = (
  options: ContentWriterOptions,
  inputType: ExtendedDMMFInputType,
) => {
  const { zodVersion } = getConfig();

  if (zodVersion?.major !== 4) {
    console.warn('upgrade to zod v4 to use native recursive types');
    return writeInputObjectTypeLegacy(options, inputType);
  }

  if (zodVersion?.major === 4) {
    return writeInputObjectTypeZodV4(options, inputType);
  }
};

/////////////////////////////////////////////
// WRITER FUNCTION
/////////////////////////////////////////////

/**
 * Writes a scalar input type field. This function checks if the field is a scalar type
 * and writes the corresponding zod type.
 *
 * @param writer
 * @param field
 */
const writeScalarInputTypeField = (
  writer: CodeBlockWriter,
  field: ExtendedDMMFSchemaArg,
) => {
  if (!field.categories.has('scalar') || field.hasMultipleTypes) {
    return;
  }

  writer.write(`${field.name}: `);

  field.inputTypes.forEach((inputType, idx) => {
    writeScalarType(writer, {
      inputType,
      writeComma: idx !== field.inputTypes.length - 1,
    });
  });
};

const writeInputTypeField = ({
  writer,
  field,
  writeComma = false,
  writeValidation = false,
}: WriteInputTypeFieldOptions) => {
  const {
    isNullable,
    isOptional,
    zodCustomErrors,
    zodValidatorString,
    zodCustomValidatorString,
  } = field;

  const { zodVersion } = getConfig();

  if (field.zodOmitField) {
    writer.write(`// omitted: `);
  }

  writeScalarInputTypeField(writer, field);

  const isScalarTypeField = field.categories.has('scalar');

  // console.log(
  //   'isScalarTypeField',
  //   isScalarTypeField,
  //   field.name,
  //   field.categories,
  //   field.inputTypes.map(
  //     (inputType) => inputType.type + ' - ' + inputType.category,
  //   ),
  // );

  // if zod version is 4, we need to use getters to return the zod type
  // because zod does not support recursive types without a type annotation or z.lazy
  if (zodVersion?.major === 4) {
    const zodTypeNonScalar = field.inputTypes[0].getZodNonScalarType();

    if (zodTypeNonScalar) {
      writer.write(`${field.name}: `);
    } else {
      writer.write(`get ${field.name}() { `);
      writer.write(`return `);
    }
  }

  if (zodVersion?.major !== 4) {
    writer.write(`${field.name}: `);
  }

  writer.conditionalWrite(field.hasMultipleTypes, `z.union([ `);

  field.inputTypes.forEach((inputType, idx) => {
    const writeComma = idx !== field.inputTypes.length - 1;

    writeScalarType(writer, {
      inputType,
      zodCustomErrors,
      zodValidatorString,
      zodCustomValidatorString,
      writeComma,
      writeValidation,
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
    .conditionalWrite(!field.isRequired, `.optional()`)
    .conditionalWrite(field.isNullable, `.nullable()`)
    .write(`,`);

  if (zodVersion?.major === 4) {
    writer.write(` },`);
  }

  writer.newLine();
};

/////////////////////////////////////////////
// CURRENT
/////////////////////////////////////////////

/**
 * This version should not be used anymore since zod v4 supports recursive types
 * without the need of a type annotation or z.lazy.
 */
const writeInputObjectTypeZodV4 = (
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
  } = getConfig();

  if (useMultipleFiles && !getSingleFileContent) {
    writeImportSet(inputType.imports);
    if (useExactOptionalPropertyTypes) {
      writeImport('ru', `./RemoveUndefined`);
    }
  }

  // // when an omit field is present, the type is not a native prism type
  // // but a zod union of the native type and an omit type
  // const type = inputType.hasOmitFields()
  //   ? `z.ZodType<Omit<Prisma.${
  //       inputType.name
  //     }, ${inputType.getOmitFieldsUnion()}>>`
  //   : `z.ZodType<Prisma.${inputType.name}>`;

  writer.blankLine().write(`export const ${inputType.name}Schema = `);

  const { extendedWhereUniqueFields } = inputType;

  const writeExtendedWhereUniqueInput =
    Array.isArray(extendedWhereUniqueFields) &&
    extendedWhereUniqueFields.length !== 0;

  if (writeExtendedWhereUniqueInput) {
    // if only one element is present in the array,
    // a z.object is used instead of a z.union
    if (extendedWhereUniqueFields.length === 1) {
      writer
        .write(`z.strictObject(`)
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
    .write(`z.object(`)
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
    .conditionalWrite(useExactOptionalPropertyTypes, '.transform(ru)')
    .write(`;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${inputType.name}Schema;`);
  }
};

/////////////////////////////////////////////
// LEGACY FUNCTION (FOR ZOD V3)
/////////////////////////////////////////////

/**
 * This version should not be used anymore since zod v4 supports recursive types
 * without the need of a type annotation or z.lazy.
 */
const writeInputObjectTypeLegacy = (
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
    .write(`z.object(`)
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
    .conditionalWrite(!writeExtendedWhereUniqueInput, `.strict()`)
    .conditionalWrite(writeExtendedWhereUniqueInput, `.strict()`)
    .conditionalWrite(useExactOptionalPropertyTypes, '.transform(ru)')
    .conditionalWrite(writeExtendedWhereUniqueInput, `)`)
    .conditionalWrite(useTypeAssertions, ` as ${type};`)
    .conditionalWrite(!useTypeAssertions, `;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${inputType.name}Schema;`);
  }
};
