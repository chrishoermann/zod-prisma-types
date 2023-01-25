import { type ContentWriterOptions } from '../../types';

export const writeTransformJsonNull = ({
  fileWriter: { writer, writeImport },
  dmmf,
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;

  const addPrismaClient =
    useMultipleFiles || getSingleFileContent ? '' : 'PrismaClient.';

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ Prisma }', prismaClientPath);
  }

  writer
    .newLine()
    .write(`export type NullableJsonInput = `)
    .write(`${addPrismaClient}Prisma.JsonValue | `)
    .write(`null | `)
    .write(`'JsonNull' | `)
    .write(`'DbNull' | `)
    .write(`${addPrismaClient}Prisma.NullTypes.DbNull | `)
    .write(`${addPrismaClient}Prisma.NullTypes.JsonNull;`)
    .blankLine();

  writer
    .write(`export const transformJsonNull = (v?: NullableJsonInput) => `)
    .inlineBlock(() => {
      writer
        .writeLine(
          `if (!v || v === 'DbNull') return ${addPrismaClient}Prisma.DbNull;`,
        )
        .writeLine(
          `if (v === 'JsonNull') return ${addPrismaClient}Prisma.JsonNull;`,
        )
        .writeLine(`return v;`);
    })
    .write(`;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default transformJsonNull;`);
  }
};
