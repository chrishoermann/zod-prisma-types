import { CodeBlockWriter } from 'ts-morph';

export const writeJsDoc = (writer: CodeBlockWriter, jsDoc?: string) => {
  if (!jsDoc) return;

  const splitDoc = jsDoc.split(/\n\r?/);

  writer.writeLine(`/**`);
  splitDoc.forEach((line) => {
    writer.writeLine(` * ${line.trim()}`);
  });
  writer.writeLine(` */`);

  // return writer.writeLine(`/**`).writeLine(` * ${jsDoc}`).writeLine(` */`);
};
