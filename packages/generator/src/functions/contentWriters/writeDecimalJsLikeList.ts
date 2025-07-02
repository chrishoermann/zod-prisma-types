import { type ContentWriterOptions } from '../../types';

export const writeDecimalJsLikeList = ({
  fileWriter: { writer, writeImports },
  dmmf,
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const { useMultipleFiles, prismaClientPath } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    writeImports([
      { name: 'z', path: 'zod' },
      { name: 'Prisma', path: prismaClientPath, isTypeOnly: true },
    ]);
  }

  writer
    .blankLine()
    .writeLine(
      `export const DecimalJsLikeListSchema: z.ZodType<Prisma.DecimalJsLike[]> = z.object({`,
    )
    .withIndentationLevel(1, () => {
      writer
        .writeLine(`d: z.array(z.number()),`)
        .writeLine(`e: z.number(),`)
        .writeLine(`s: z.number(),`)
        .writeLine(`toFixed: z.function(z.tuple([]), z.string()),`);
    })
    .writeLine(`}).array();`);

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default DecimalJsLikeListSchema;`);
  }
};
