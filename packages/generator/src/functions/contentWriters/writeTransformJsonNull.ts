import { type ContentWriterOptions } from '../../types';
import { getConfig } from '../../config';

export const writeTransformJsonNull = ({
  fileWriter: { writer, writeImport },
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const {
    useMultipleFiles,
    prismaClientPath,
    prismaLibraryPath,
    isPrismaClientGenerator,
    prismaVersion,
  } = getConfig();

  // TODO: check how to get DbNUll and JsonNull from PrismaClient without importing the whole namespace

  // Prisma 7 no longer exports `objectEnumValues`; its namespace exposes the null instances directly
  const isPrismaClientV7 =
    isPrismaClientGenerator && (prismaVersion?.major ?? 0) >= 7;
  const usesRuntimeNullTypes = isPrismaClientGenerator && !isPrismaClientV7;

  if (useMultipleFiles && !getSingleFileContent) {
    if (usesRuntimeNullTypes) {
      writeImport('type { objectEnumValues, JsonValue }', prismaLibraryPath);
    } else {
      writeImport('{ Prisma }', prismaClientPath);
    }
  }

  const jsonValueTypeName = usesRuntimeNullTypes
    ? 'JsonValue'
    : 'Prisma.JsonValue';

  let nullTypesTypeName = '';
  let nullTypesValueName = '';

  if (isPrismaClientV7) {
    nullTypesTypeName = 'typeof Prisma';
    nullTypesValueName = 'Prisma';
  } else if (isPrismaClientGenerator) {
    nullTypesTypeName = 'typeof objectEnumValues.instances';
    nullTypesValueName = nullTypesTypeName;
  } else {
    nullTypesTypeName = 'Prisma.NullTypes';
    nullTypesValueName = nullTypesTypeName;
  }

  writer
    .newLine()
    .write(`export type NullableJsonInput = `)
    .write(`${jsonValueTypeName} | `)
    .write(`null | `)
    .write(`'JsonNull' | `)
    .write(`'DbNull' | `)
    .write(`${nullTypesTypeName}.DbNull | `)
    .write(`${nullTypesTypeName}.JsonNull;`)
    .blankLine();

  writer
    .write(`export const transformJsonNull = (v?: NullableJsonInput) => `)
    .inlineBlock(() => {
      writer
        .writeLine(
          `if (!v || v === 'DbNull') return ${nullTypesValueName}.DbNull;`,
        )
        .writeLine(
          `if (v === 'JsonNull') return ${nullTypesValueName}.JsonNull;`,
        )
        .writeLine(`return v;`);
    })
    .write(`;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default transformJsonNull;`);
  }
};
