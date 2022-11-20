/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { ENUM_IMPORT_STATEMENT } from '../constants';
import { CodeBlockWriter } from 'ts-morph';

import { GetStatements, Statement } from '../types';
import { writeConstStatement, writeHeading } from '../utils';

import { ExtendedDMMFField } from '@/classes/extendedDMMFField';

// export interface WriteScalarFieldsOptions {
//   writer: CodeBlockWriter;
//   field: ExtendedDMMFField;

const writeScalarFields = (
  writer: CodeBlockWriter,
  fields: ExtendedDMMFField[],
) => {
  fields.forEach((field, idx) => {
    if (!field.isScalarField()) return;
    writer
      .conditionalNewLine(idx > 0)
      .write(field.name)
      .write(`: z.`)
      .write(field.zodType)
      .write(`(`)
      .conditionalWrite(!!field.zodCustomErrors, field.zodCustomErrors!)

      .write(`)`)
      .conditionalWrite(!!field.zodValidatorString, field.zodValidatorString!)
      .conditionalWrite(field.isNullableField(), `.optional()`)
      .write(`,`);
  });
};

const writeEnumFields = (
  writer: CodeBlockWriter,
  fields: ExtendedDMMFField[],
) => {
  fields
    .filter((field) => field.isEnumField())
    .forEach((field, idx) => {
      if (!field.isEnumField()) return;
      writer
        .conditionalNewLine(idx > 0)
        .write(field.name)
        .write(`: Enum.`)
        .write(`${field.type}Type`)
        .conditionalWrite(field.isNullableField(), `.optional()`)
        .write(`,`);
    });
};

const writeRelationFields = (
  writer: CodeBlockWriter,
  fields: ExtendedDMMFField[],
) => {
  fields.forEach((field, idx) => {
    if (!field.isRelationField()) return;
    writer
      .conditionalNewLine(idx > 0)
      .write(field.name)
      .write(`: z.lazy(() => `)
      .write(`${field.type}Type`)
      .write(`)`)
      .conditionalWrite(field.isNullableField(), `.optional()`)
      .write(`,`);
  });
};

export const getModelStatements: GetStatements = (datamodel) =>
  datamodel.models
    .map(({ formattedNames, fields }) => {
      // GENERATE MODEL
      // ---------------------------------------------------------------------
      const modelStatements: Statement[] = [];

      const scalarTypeName = `${formattedNames.pascalCase}CreateInputScalarType`;
      const scalarAndEnumTypeName = `${formattedNames.pascalCase}CreateInputScalarAndEnumType`;
      const typeName = `${formattedNames.pascalCase}CreateInputType`;

      modelStatements.push(
        writeHeading(`${formattedNames.upperCaseSpace} MODEL`, 'FAT'),
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: scalarTypeName,
              initializer(writer) {
                writer
                  .write(`z.object(`)
                  .inlineBlock(() => {
                    writeScalarFields(writer, fields);
                  })
                  .write(`)`);
              },
            },
          ],
        }),
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: scalarAndEnumTypeName,
              initializer(writer) {
                writer
                  .write(scalarTypeName)
                  .write(`.extend(`)
                  .inlineBlock(() => {
                    writeEnumFields(writer, fields);
                  })
                  .write(`)`);
              },
            },
          ],
        }),
        writeConstStatement({
          leadingTrivia: (writer) => writer.newLine(),
          declarations: [
            {
              name: typeName,
              type: `z.ZodType<Prisma.Prisma.${formattedNames.pascalCase}CreateInput>`,
              initializer(writer) {
                writer
                  .write(scalarTypeName)
                  .write(`.extend(`)
                  .inlineBlock(() => {
                    writeScalarFields(writer, fields);
                    writeEnumFields(writer, fields);
                    writeRelationFields(writer, fields);
                  })
                  .write(`)`);
              },
            },
          ],
        }),
      );

      // GENERATE ENUM FILTER
      // ---------------------------------------------------------------------

      return modelStatements;
    })
    .flat();
