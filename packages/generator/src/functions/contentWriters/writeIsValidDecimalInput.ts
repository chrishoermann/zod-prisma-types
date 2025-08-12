import { type ContentWriterOptions } from '../../types';

export const writeIsValidDecimalInput = ({
  fileWriter: { writer, writeImport },
  dmmf,
  getSingleFileContent = false,
}: ContentWriterOptions) => {
  const {
    useMultipleFiles,
    prismaClientPath,
    prismaLibraryPath,
    isPrismaClientGenerator,
  } = dmmf.generatorConfig;

  if (useMultipleFiles && !getSingleFileContent) {
    if (isPrismaClientGenerator) {
      writeImport('type { DecimalJsLike }', `${prismaLibraryPath}`);
    } else {
      writeImport('type { Prisma }', `${prismaClientPath}`);
    }
  }

  const decimalJsLikeTypeName = isPrismaClientGenerator
    ? 'DecimalJsLike'
    : 'Prisma.DecimalJsLike';

  writer
    .blankLine()
    .writeLine(
      `export const DECIMAL_STRING_REGEX = /^(?:-?Infinity|NaN|-?(?:0[bB][01]+(?:\\.[01]+)?(?:[pP][-+]?\\d+)?|0[oO][0-7]+(?:\\.[0-7]+)?(?:[pP][-+]?\\d+)?|0[xX][\\da-fA-F]+(?:\\.[\\da-fA-F]+)?(?:[pP][-+]?\\d+)?|(?:\\d+|\\d*\\.\\d+)(?:[eE][-+]?\\d+)?))$/;`,
    )
    .blankLine()
    .writeLine(`export const isValidDecimalInput =`)
    .withIndentationLevel(1, () => {
      writer
        .write(
          `(v?: null | string | number | ${decimalJsLikeTypeName}): v is string | number | ${decimalJsLikeTypeName} => `,
        )
        .inlineBlock(() => {
          writer
            .writeLine(`if (v === undefined || v === null) return false;`)
            .writeLine(`return (`)
            .withIndentationLevel(3, () => {
              writer
                .writeLine(
                  `(typeof v === 'object' && 'd' in v && 'e' in v && 's' in v && 'toFixed' in v) ||`,
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
