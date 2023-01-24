import { ExtendedDMMFEnum } from '../../classes';
import { type ContentWriterOptions } from '../../types';

export const writeCustomEnum = (
  { fileWriter: { writer, writeImport }, dmmf }: ContentWriterOptions,
  { name }: ExtendedDMMFEnum,
) => {
  const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;
  const addPrismaClient = useMultipleFiles ? '' : 'PrismaClient.';

  if (useMultipleFiles) {
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

  if (useMultipleFiles) {
    writer.blankLine().writeLine(`export default ${name}Schema;`);
  }
};
