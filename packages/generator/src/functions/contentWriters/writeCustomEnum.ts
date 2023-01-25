import { ExtendedDMMFEnum } from '../../classes';
import { type ContentWriterOptions } from '../../types';

export const writeCustomEnum = (
  {
    fileWriter: { writer, writeImport },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  { name }: ExtendedDMMFEnum,
) => {
  const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;

  const addPrismaClient =
    useMultipleFiles || getSingleFileContent ? '' : 'PrismaClient.';

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
    writeImport(`{ ${name} }`, prismaClientPath);
  }

  writer
    .blankLine()
    .writeLine(
      `export const ${name}Schema = z.nativeEnum(${addPrismaClient}${name})`,
    )
    .blankLine()
    .writeLine(
      `export type ${name}Type = \`\${z.infer<typeof ${name}Schema>}\``,
    );

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${name}Schema;`);
  }
};
