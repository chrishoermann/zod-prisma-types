import { ExtendedDMMFOutputType } from '../../classes';
import { type ContentWriterOptions } from '../../types';

/**
 * The args schema is used in "include" and "select" schemas
 */
export const writeArgs = (
  {
    fileWriter: { writer, writeImport },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  model: ExtendedDMMFOutputType,
) => {
  const { useMultipleFiles, prismaClientPath, inputTypePath, prismaVersion } =
    dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
    writeImport('type { Prisma }', prismaClientPath);
    writeImport(
      `{ ${model.name}SelectSchema }`,
      `../${inputTypePath}/${model.name}SelectSchema`,
    );
    if (model.hasRelationField()) {
      writeImport(
        `{ ${model.name}IncludeSchema }`,
        `../${inputTypePath}/${model.name}IncludeSchema`,
      );
    }
  }
  writer
    .blankLine()
    .write(`export const ${model.name}ArgsSchema: `)
    .conditionalWrite(
      (prismaVersion?.major === 5 && prismaVersion?.minor >= 1) ||
        prismaVersion?.major === 6 ||
        // fallback to newest version of client version cannot be determined
        prismaVersion === undefined,
      `z.ZodType<Prisma.${model.name}DefaultArgs> = `,
    )
    .conditionalWrite(
      (prismaVersion?.major === 5 && prismaVersion?.minor === 0) ||
        prismaVersion?.major === 4,
      `z.ZodType<Prisma.${model.name}Args> = `,
    )
    .write(`z.object(`)
    .inlineBlock(() => {
      writer
        .write(`select: `)
        .write(`z.lazy(() => ${model.name}SelectSchema).optional(),`)
        .newLine()
        .conditionalWrite(
          model.hasRelationField(),
          `include: z.lazy(() => ${model.name}IncludeSchema).optional(),`,
        );
    })
    .write(`).strict();`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${model.name}ArgsSchema;`);
  }
};
