import { type ContentWriterOptions } from '../../types';

export const writeTransformJsonNull = ({
  fileWriter: { writer, writeImport },
  dmmf,
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const {
    useMultipleFiles,
    prismaClientPath,
    prismaLibraryPath,
    isPrismaQueryCompiler,
  } = dmmf.generatorConfig;

  // TODO: check how to get DbNUll and JsonNull from PrismaClient without importing the whole namespace

  if (useMultipleFiles && !getSingleFileContent) {
    if (isPrismaQueryCompiler) {
      writeImport('type { objectEnumValues, JsonValue }', prismaLibraryPath);
    } else {
      writeImport('{ Prisma }', prismaClientPath);
    }
  }

  const jsonValueTypeName = isPrismaQueryCompiler
    ? 'JsonValue'
    : 'Prisma.JsonValue';

  const nullTypesTypeName = isPrismaQueryCompiler
    ? 'typeof objectEnumValues.instances'
    : 'Prisma.NullTypes';

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
          `if (!v || v === 'DbNull') return ${nullTypesTypeName}.DbNull;`,
        )
        .writeLine(
          `if (v === 'JsonNull') return ${nullTypesTypeName}.JsonNull;`,
        )
        .writeLine(`return v;`);
    })
    .write(`;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default transformJsonNull;`);
  }
};
