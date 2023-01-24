import { ExtendedDMMFSchemaEnum } from '../../classes';
import { type ContentWriterOptions } from '../../types';

export const writePrismaEnum = (
  { fileWriter: { writer, writeImport }, dmmf }: ContentWriterOptions,
  { useNativeEnum, values, name }: ExtendedDMMFSchemaEnum,
) => {
  const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;
  const addPrismaClient = useMultipleFiles ? '' : 'PrismaClient.';

  if (useMultipleFiles) {
    writeImport('{ z }', 'zod');
  }

  if (useNativeEnum) {
    if (useMultipleFiles) {
      writeImport('{ Prisma }', prismaClientPath);
    }

    writer
      .blankLine()
      .writeLine(
        `export const ${name}Schema = z.nativeEnum(${addPrismaClient}Prisma.${name});`,
      );
  } else {
    writer
      .conditionalWrite(
        useMultipleFiles && name.includes('NullableJson'),
        `import transformJsonNull from './transformJsonNull'`,
      )
      .blankLine()
      .write(`export const ${name}Schema = z.enum([`);
    values.forEach((value) => {
      writer.write(`'${value}',`);
    });
    writer
      .write(`])`)
      .conditionalWrite(!name.includes('Nullable'), `;`)
      .conditionalWrite(
        name.includes('Nullable'),
        `.transform((v) => transformJsonNull(v));`,
      );
  }

  if (useMultipleFiles) {
    writer.blankLine().writeLine(`export default ${name}Schema;`);
  }
};
