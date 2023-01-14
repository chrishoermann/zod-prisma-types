import CodeBlockWriter, { type Options } from 'code-block-writer';
import { DirectoryHelper } from './directoryHelper';
import fs from 'fs';

export interface FileWriterOptions {
  writerOptions?: Options;
}

export class FileWriter {
  readonly writer: CodeBlockWriter;

  constructor(options?: FileWriterOptions) {
    this.writer = new CodeBlockWriter(
      options?.writerOptions || {
        indentNumberOfSpaces: 2,
        useSingleQuote: true,
      },
    );
  }

  public createPath(path: string) {
    return DirectoryHelper.createDir(path);
  }

  createFile(path: string, writerFn: (writer: CodeBlockWriter) => void) {
    writerFn(this.writer);

    fs.writeFile(path, this.writer.toString(), (err) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  }
}
