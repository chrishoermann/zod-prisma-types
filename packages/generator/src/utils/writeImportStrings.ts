import CodeBlockWriter from 'code-block-writer';

export const writeImportStrings = (
  writer: CodeBlockWriter,
  strings: Set<string>,
) => {
  if (strings.size > 0) {
    strings.forEach((importString) => {
      writer.writeLine(importString);
    });
  }
};
