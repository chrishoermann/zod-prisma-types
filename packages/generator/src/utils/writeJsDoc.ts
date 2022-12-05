import { CodeBlockWriter } from 'ts-morph';

export const writeJsDoc = (writer: CodeBlockWriter, jsDoc?: string) => {
  if (!jsDoc) return;
  return writer.writeLine(`/**`).writeLine(` * ${jsDoc}`).writeLine(` */`);
};
