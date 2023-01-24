import { type ContentWriterOptions } from '../../types';

export const writeDecimalJsLike = ({
  fileWriter: { writer, writeImport },
  dmmf,
}: ContentWriterOptions) => {
  const { useMultipleFiles } = dmmf.generatorConfig;

  if (useMultipleFiles) {
    writeImport('{ z }', 'zod');
  }

  writer
    .blankLine()
    .writeLine(
      `export const DecimalJSLikeSchema = z.object({ d: z.array(z.number()), e: z.number(), s: z.number() });`,
    );

  if (useMultipleFiles) {
    writer.blankLine().writeLine(`export default DecimalJSLikeSchema;`);
  }
};
