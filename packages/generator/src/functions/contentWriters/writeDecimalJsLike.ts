import { type ContentWriterOptions } from '../../types';

export const writeDecimalJsLike = ({
  fileWriter: { writer, writeImport },
  dmmf,
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
    writeImport('type { DecimalJsLike }', `${prismaClientPath}/runtime`);
  }

  writer
    .blankLine()
    .writeLine(
      `export const DecimalJSLikeSchema: z.ZodType<DecimalJsLike> = z.object({ d: z.array(z.number()), e: z.number(), s: z.number(), toFixed: z.function().args().returns(z.string()), });`,
    )
    .newLine()
    .writeLine(
      `export type DecimalJSLike = z.infer<typeof DecimalJSLikeSchema>;`,
    );

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default DecimalJSLikeSchema;`);
  }
};
