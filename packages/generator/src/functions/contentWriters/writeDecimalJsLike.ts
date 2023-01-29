import { type ContentWriterOptions } from '../../types';

export const writeDecimalJsLike = ({
  fileWriter: { writer, writeImport },
  dmmf,
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const { useMultipleFiles } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImport('{ z }', 'zod');
  }

  writer
    .blankLine()
    .writeLine(
      `export const DecimalJSLikeSchema = z.object({ d: z.array(z.number()), e: z.number(), s: z.number() });`,
    )
    .newLine()
    .writeLine(
      `export type DecimalJSLike = z.infer<typeof DecimalJSLikeSchema>;`,
    );

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default DecimalJSLikeSchema;`);
  }
};
