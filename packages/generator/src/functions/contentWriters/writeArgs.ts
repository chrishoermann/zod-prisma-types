import {
  ExtendedDMMFOutputType,
  writeImportStatementOptions,
} from '../../classes';
import { type ContentWriterOptions } from '../../types';
import { getCommonArgImports } from './getCommonImports';

/**
 * The args schema is used in "include" and "select" schemas
 */
export const writeArgs = (
  {
    fileWriter: { writer, writeImports },
    dmmf,
    getSingleFileContent = false,
  }: ContentWriterOptions,
  model: ExtendedDMMFOutputType,
) => {
  const {
    useMultipleFiles,
    useExactOptionalPropertyTypes,
    inputTypePath,
    prismaVersion,
  } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    const imports: writeImportStatementOptions[] = getCommonArgImports(
      dmmf.generatorConfig,
    );
    imports.push({
      name: `${model.name}SelectSchema`,
      path: `../${inputTypePath}/${model.name}SelectSchema`,
    });
    if (model.hasRelationField()) {
      imports.push({
        name: `${model.name}IncludeSchema`,
        path: `../${inputTypePath}/${model.name}IncludeSchema`,
      });
    }
    writeImports(imports);
  }

  writer
    .blankLine()
    .write(`export const ${model.name}ArgsSchema: `)
    .conditionalWrite(
      (prismaVersion?.major === 5 && prismaVersion?.minor >= 1) ||
        (prismaVersion?.major && prismaVersion?.major >= 6) ||
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
    .write(`).strict()`)
    .conditionalWrite(useExactOptionalPropertyTypes, '.transform(ru)')
    .write(`;`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default ${model.name}ArgsSchema;`);
  }
};
