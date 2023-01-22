import CodeBlockWriter, { type Options } from 'code-block-writer';
import { DirectoryHelper } from './directoryHelper';
import fs from 'fs';

export interface FileWriterOptions {
  writerOptions?: Options;
}

export interface writeConstStatementOptions {
  name: string;
  type: string;
}

export interface CreateFileOptions {
  writer: CodeBlockWriter;
  writeImport: (importName: string, importPath: string) => void;
  writeImportSet: (strings: Set<string>) => void;
  writeExport: (importName: string, importPath: string) => void;
}

export interface CreateFileComplexOptions {
  /**
   * The path to the file to be created
   */
  path: string;
  /**
   * The imports to be written to the file
   */
  imports: Set<string>;
  /**
   * The name of the exported const statement
   */
  name?: string;
  /**
   * The type of the exported const statement
   */
  type?: string;
  /**
   * The default export to be written to the file
   */
  defaultExport?: string;
  /**
   * The content to be written to the file
   * @param writer The CodeBlockWriter instance
   */
  content: (writer: CodeBlockWriter) => void;
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
    if (DirectoryHelper.pathOrDirExists(path)) {
      return path;
    }
    return DirectoryHelper.createDir(path);
  }

  public createFileFromObject({
    content,
    path,
    imports,
    defaultExport,
    name,
    type,
  }: CreateFileComplexOptions) {
    this.writeImportSet(imports);
    this.writer.blankLine();

    if (name) {
      this.writer.write(`export const ${name}${type ? `: ${type}` : ''} = `);
    }

    content(this.writer);

    if (defaultExport) {
      this.writer.blankLine();
      this.writer.writeLine(`export default ${defaultExport}`);
    }

    fs.writeFile(path, this.writer.toString(), (err) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  }

  public createFile(
    path: string,
    writerFn: (options: CreateFileOptions) => void,
  ) {
    writerFn({
      writer: this.writer,
      writeImport: this.writeImport.bind(this),
      writeImportSet: this.writeImportSet.bind(this),
      writeExport: this.writeExport.bind(this),
    });

    fs.writeFile(path, this.writer.toString(), (err) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  }

  writeImport(importName: string, importPath: string) {
    this.writer.writeLine(`import ${importName} from '${importPath}'`);
  }

  writeImportSet(strings: Set<string>) {
    if (strings.size > 0) {
      strings.forEach((importString) => {
        this.writer.writeLine(importString);
      });
    }
  }

  writeExport(importName: string, importPath: string) {
    this.writer.writeLine(`export ${importName} from '${importPath}'`);
  }

  writeConstStatement({ name, type }: writeConstStatementOptions) {
    this.writer.writeLine(`export const ${name}: ${type} = `);
  }
}
