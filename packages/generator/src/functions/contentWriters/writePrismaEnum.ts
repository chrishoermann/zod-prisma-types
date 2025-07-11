import { ExtendedDMMFSchemaEnum } from '../../classes';
import { type ContentWriterOptions } from '../../types';

export const writePrismaEnum = (
  {
    fileWriter: { writer, writeImport },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  { useNativeEnum, values, name }: ExtendedDMMFSchemaEnum,
) => {
  const {
    useMultipleFiles,
    prismaClientPath,
    prismaLibraryPath,
    isPrismaQueryCompiler,
  } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
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
      writer
        .conditionalWrite(
          useMultipleFiles && !isPrismaQueryCompiler,
          `import { Prisma } from '${prismaClientPath}';`,
        )
        .conditionalWrite(
          useMultipleFiles && isPrismaQueryCompiler,
          `import { objectEnumValues } from '${prismaLibraryPath}';`,
        )
        .blankLine()
        .write(`export const ${name}Schema = z.enum([`);
      values.forEach((value) => {
        writer.write(`'${value}',`);
      });
      const jsonNullTypeName = isPrismaQueryCompiler
        ? 'objectEnumValues.instances.JsonNull'
        : 'Prisma.JsonNull';
      writer.write(
        `]).transform((value) => (value === 'JsonNull' ? ${jsonNullTypeName} : value));`,
      );

      return;
    }

    if (name === 'NullableJsonNullValueInput') {
      writer
        .conditionalWrite(
          useMultipleFiles && !isPrismaQueryCompiler,
          `import { Prisma } from '${prismaClientPath}';`,
        )
        .conditionalWrite(
          useMultipleFiles && isPrismaQueryCompiler,
          `import { objectEnumValues } from '${prismaLibraryPath}';`,
        )
        .blankLine()
        .write(`export const ${name}Schema = z.enum([`);
      values.forEach((value) => {
        writer.write(`'${value}',`);
      });
      const jsonNullTypeName = isPrismaQueryCompiler
        ? 'objectEnumValues.instances.JsonNull'
        : 'Prisma.JsonNull';
      const dbNullTypeName = isPrismaQueryCompiler
        ? 'objectEnumValues.instances.DbNull'
        : 'Prisma.DbNull';
      writer.write(
        `]).transform((value) => value === 'JsonNull' ? ${jsonNullTypeName} : value === 'DbNull' ? ${dbNullTypeName} : value);`,
      );

      return;
    }
    if (name === 'JsonNullValueFilter') {
      writer
        .conditionalWrite(
          useMultipleFiles && !isPrismaQueryCompiler,
          `import { Prisma } from '${prismaClientPath}';`,
        )
        .conditionalWrite(
          useMultipleFiles && isPrismaQueryCompiler,
          `import { objectEnumValues } from '${prismaLibraryPath}';`,
        )
        .blankLine()
        .write(`export const ${name}Schema = z.enum([`);
      values.forEach((value) => {
        writer.write(`'${value}',`);
      });
      const jsonNullTypeName = isPrismaQueryCompiler
        ? 'objectEnumValues.instances.JsonNull'
        : 'Prisma.JsonNull';
      const dbNullTypeName = isPrismaQueryCompiler
        ? 'objectEnumValues.instances.DbNull'
        : 'Prisma.DbNull';
      const anyNullTypeName = isPrismaQueryCompiler
        ? 'objectEnumValues.instances.AnyNull'
        : 'Prisma.AnyNull';
      writer.write(
        `]).transform((value) => value === 'JsonNull' ? ${jsonNullTypeName} : value === 'DbNull' ? ${dbNullTypeName} : value === 'AnyNull' ? ${anyNullTypeName} : value);`,
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
