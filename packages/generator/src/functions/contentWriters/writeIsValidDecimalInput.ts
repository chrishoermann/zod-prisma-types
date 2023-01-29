import { type ContentWriterOptions } from '../../types';

export const writeIsValidDecimalInput = ({
  fileWriter: { writer, writeImport },
  dmmf,
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const { useMultipleFiles } = dmmf.generatorConfig;

  // const addPrismaClient =
  //   useMultipleFiles || getSingleFileContent ? '' : 'PrismaClient.';

  if (useMultipleFiles && !getSingleFileContent) {
    // writeImport('{ Prisma }', prismaClientPath);
    // writeImport('{ DecimalJsLike }', `${prismaClientPath}/runtime`);
    writeImport('{ type DecimalJSLike }', `./DecimalJsLikeSchema`);
  }

  writer
    .blankLine()
    .writeLine(
      `export const DECIMAL_STRING_REGEX = /^[0-9.,e+-bxffo_cp]+$|Infinity|NaN/;`,
    )
    .blankLine()
    .writeLine(`export const isValidDecimalInput =`)
    .withIndentationLevel(1, () => {
      writer
        .write(`(v?: null | string | number | DecimalJSLike) => `)
        // .write(
        //   `(v?: null | string | number | ${addPrismaClient}Prisma.Decimal | DecimalJSLike) => `,
        // )
        .inlineBlock(() => {
          writer
            .writeLine(`if (!v) return false;`)
            .writeLine(`return (`)
            .withIndentationLevel(3, () => {
              writer
                // .writeLine(
                //   `(typeof v === 'object' && ${addPrismaClient}Prisma.Decimal.isDecimal(v)) ||`,
                // )
                .writeLine(
                  `(typeof v === 'object' && 'd' in v && 'e' in v && 's' in v) ||`,
                )
                .writeLine(
                  `(typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||`,
                )
                .writeLine(`typeof v === 'number'`);
            })
            .write(`)`);
        })
        .write(`;`);
    });

  if (useMultipleFiles && !getSingleFileContent) {
    writer.blankLine().writeLine(`export default isValidDecimalInput;`);
  }
};
