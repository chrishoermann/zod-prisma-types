import { ExtendedDMMFSchemaEnum } from '../../classes';
import { type ContentWriterOptions } from '../../types';
import { writeZodImport } from '..';
import { getConfig } from '../../config';

export const writePrismaEnum = (
  {
    fileWriter: { writer, writeImport },
    getSingleFileContent = false,
  }: ContentWriterOptions,
  { useNativeEnum, values, name }: ExtendedDMMFSchemaEnum,
) => {
  const {
    useMultipleFiles,
    prismaClientPath,
    prismaLibraryPath,
    isPrismaClientGenerator,
    prismaVersion,
  } = getConfig();

  if (useMultipleFiles && !getSingleFileContent) {
    writeZodImport(writeImport);
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
          useMultipleFiles && !isPrismaClientGenerator,
          `import { Prisma } from '${prismaClientPath}';`,
        )
        .conditionalWrite(
          useMultipleFiles &&
            isPrismaClientGenerator &&
            prismaVersion?.major === 6,
          `import { objectEnumValues } from '${prismaLibraryPath}';`,
        )
        .conditionalWrite(
          useMultipleFiles &&
            isPrismaClientGenerator &&
            (prismaVersion?.major ?? 0) >= 7,
          `import { NullTypes } from '${prismaClientPath}/runtime/client';`,
        )
        .blankLine()
        .write(`export const ${name}Schema = z.enum([`);
      values.forEach((value) => {
        writer.write(`'${value}',`);
      });

      let jsonNullTypeName = '';

      if (isPrismaClientGenerator && prismaVersion?.major === 6) {
        jsonNullTypeName = 'objectEnumValues.instances.JsonNull';
      } else if (isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7) {
        jsonNullTypeName = 'NullTypes.JsonNull';
      } else {
        jsonNullTypeName = 'Prisma.JsonNull';
      }

      writer.write(
        `]).transform((value) => (value === 'JsonNull' ? ${jsonNullTypeName} : value));`,
      );

      return;
    }

    if (name === 'NullableJsonNullValueInput') {
      writer
        .conditionalWrite(
          useMultipleFiles && !isPrismaClientGenerator,
          `import { Prisma } from '${prismaClientPath}';`,
        )
        .conditionalWrite(
          useMultipleFiles &&
            isPrismaClientGenerator &&
            prismaVersion?.major === 6,
          `import { DbNull, JsonNull } from '${prismaLibraryPath}';`,
        )
        .conditionalWrite(
          useMultipleFiles &&
            isPrismaClientGenerator &&
            (prismaVersion?.major ?? 0) >= 7,
          `import { NullTypes } from '${prismaClientPath}/runtime/client';`,
        )
        .blankLine()
        .write(`export const ${name}Schema = z.enum([`);
      values.forEach((value) => {
        writer.write(`'${value}',`);
      });

      let jsonNullTypeName = '';
      if (isPrismaClientGenerator && prismaVersion?.major === 6) {
        jsonNullTypeName = 'objectEnumValues.instances.JsonNull';
      } else if (isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7) {
        jsonNullTypeName = 'NullTypes.JsonNull';
      } else {
        jsonNullTypeName = 'Prisma.JsonNull';
      }

      let dbNullTypeName = '';
      if (isPrismaClientGenerator && prismaVersion?.major === 6) {
        dbNullTypeName = 'objectEnumValues.instances.DbNull';
      } else if (isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7) {
        dbNullTypeName = 'NullTypes.DbNull';
      } else {
        dbNullTypeName = 'Prisma.DbNull';
      }

      writer.write(
        `]).transform((value) => value === 'JsonNull' ? ${jsonNullTypeName} : value === 'DbNull' ? ${dbNullTypeName} : value);`,
      );

      return;
    }
    if (name === 'JsonNullValueFilter') {
      writer
        .conditionalWrite(
          useMultipleFiles && !isPrismaClientGenerator,
          `import { Prisma } from '${prismaClientPath}';`,
        )
        .conditionalWrite(
          useMultipleFiles &&
            isPrismaClientGenerator &&
            prismaVersion?.major === 6,
          `import { objectEnumValues } from '${prismaLibraryPath}';`,
        )
        .conditionalWrite(
          useMultipleFiles &&
            isPrismaClientGenerator &&
            (prismaVersion?.major ?? 0) >= 7,
          `import { NullTypes } from '${prismaClientPath}/runtime/client';`,
        )
        .blankLine()
        .write(`export const ${name}Schema = z.enum([`);
      values.forEach((value) => {
        writer.write(`'${value}',`);
      });

      let jsonNullTypeName = '';
      if (isPrismaClientGenerator && prismaVersion?.major === 6) {
        jsonNullTypeName = 'objectEnumValues.instances.JsonNull';
      } else if (isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7) {
        jsonNullTypeName = 'NullTypes.JsonNull';
      } else {
        jsonNullTypeName = 'Prisma.JsonNull';
      }

      let anyNullTypeName = '';
      if (isPrismaClientGenerator && prismaVersion?.major === 6) {
        anyNullTypeName = 'objectEnumValues.instances.AnyNull';
      } else if (isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7) {
        anyNullTypeName = 'NullTypes.AnyNull';
      } else {
        anyNullTypeName = 'Prisma.AnyNull';
      }

      let dbNullTypeName = '';
      if (isPrismaClientGenerator && prismaVersion?.major === 6) {
        dbNullTypeName = 'objectEnumValues.instances.DbNull';
      } else if (isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7) {
        dbNullTypeName = 'NullTypes.DbNull';
      } else {
        dbNullTypeName = 'Prisma.DbNull';
      }

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
