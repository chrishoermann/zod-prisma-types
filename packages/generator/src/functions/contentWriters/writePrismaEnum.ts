import {
  ExtendedDMMFSchemaEnum,
  writeImportStatementOptions,
} from '../../classes';
import { type ContentWriterOptions } from '../../types';

export const writePrismaEnum = (
  {
    fileWriter: { writer, writeImports },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  { useNativeEnum, values, name }: ExtendedDMMFSchemaEnum,
) => {
  const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;

  if (useMultipleFiles) {
    const imports: writeImportStatementOptions[] = [];
    if (!getSingleFileContent) {
      imports.push({ name: 'z', path: 'zod' });
    }
    if (
      [
        'JsonNullValueInput',
        'NullableJsonNullValueInput',
        'JsonNullValueFilter',
      ].includes(name)
    ) {
      imports.push({
        name: 'Prisma',
        path: prismaClientPath,
      });
    }
    writeImports(imports);
  }

  if (useNativeEnum) {
    writer.blankLine().write(`export const ${name}Schema = z.enum([`);
    values.forEach((value, idx) => {
      const writeComma = idx !== values.length - 1;

      writer.write(`'${value}'${writeComma ? ',' : ''}`);
    });
    writer.write(`]);`);
  } else {
    if (name === 'JsonNullValueInput') {
      writer.blankLine().write(`export const ${name}Schema = z.enum([`);
      values.forEach((value) => {
        writer.write(`'${value}',`);
      });
      writer.write(
        `]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));`,
      );

      return;
    }

    if (name === 'NullableJsonNullValueInput') {
      writer.blankLine().write(`export const ${name}Schema = z.enum([`);
      values.forEach((value) => {
        writer.write(`'${value}',`);
      });
      writer.write(
        `]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);`,
      );

      return;
    }
    if (name === 'JsonNullValueFilter') {
      writer.blankLine().write(`export const ${name}Schema = z.enum([`);
      values.forEach((value) => {
        writer.write(`'${value}',`);
      });
      writer.write(
        `]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);`,
      );

      return;
    }

    writer
      // .conditionalWrite(
      //   useMultipleFiles && name.includes('NullableJson'),
      //   `import transformJsonNull from './transformJsonNull'`,
      // )
      // .blankLine()
      .write(`export const ${name}Schema = z.enum([`);
    values.forEach((value) => {
      writer.write(`'${value}',`);
    });
    writer.write(`])`);
    // .conditionalWrite(!name.includes('Nullable'), `;`)
    // .conditionalWrite(
    //   name.includes('Nullable'),
    //   `.transform((v) => transformJsonNull(v));`,
    // );
  }

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${name}Schema;`);
  }
};
