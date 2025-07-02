import CodeBlockWriter, { type Options } from 'code-block-writer';
import fs from 'fs';

import { DirectoryHelper } from './directoryHelper';
import { GeneratorConfig } from '../schemas';

export interface FileWriterOptions {
  writerOptions?: Options;
}

export interface writeConstStatementOptions {
  name: string;
  type: string;
}

export interface writeImportStatementOptions {
  name: string;
  path: string;
  as?: string;
  isTypeOnly?: boolean;
  isDefault?: boolean;
}

export interface CreateFileOptions {
  writer: CodeBlockWriter;
  writeImport: (importName: string, importPath: string) => void;
  writeImports: (imports: writeImportStatementOptions[]) => void;
  writeExport: (importName: string, importPath: string) => void;
  writeHeading: (headline: string, type?: 'SLIM' | 'FAT') => void;
  writeJSDoc: (documentation?: string) => void;
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

  constructor(
    private readonly generatorConfig?: GeneratorConfig,
    options?: FileWriterOptions,
  ) {
    // this.generatorConfig = generatorConfig
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

  public createFile(
    path: string,
    writerFn: (options: CreateFileOptions) => void,
  ) {
    writerFn({
      writer: this.writer,
      writeImport: this.writeImport.bind(this),
      writeImports: this.writeImports.bind(this),
      writeExport: this.writeExport.bind(this),
      // writeImports: this.writeImports.bind(this),
      writeHeading: this.writeHeading.bind(this),
      writeJSDoc: this.writeJSDoc.bind(this),
    });

    fs.writeFileSync(path, this.writer.toString());
  }

  resolveModulePath(path: string) {
    const shouldUseExtensionForRelativeImports =
      this.generatorConfig?.moduleResolution === 'node16' ||
      this.generatorConfig?.moduleResolution === 'nodenext';

    if (
      path.startsWith('.') &&
      !path.endsWith('.js') &&
      shouldUseExtensionForRelativeImports
    ) {
      return `${path}.js`;
    }
    return path;
  }

  writeImport(importName: string, importPath: string) {
    this.writer.writeLine(`import ${importName} from '${importPath}';`);
  }

  writeImports(imports: writeImportStatementOptions[]) {
    // Merge different imports for the same path
    const pathMap = new Map<
      string, // import path
      {
        // List of names for default imports
        defaultImport: Set<string>;
        // List of names for named imports
        namedImports: Set<string>;
        // List of names for named type imports
        namedTypeImports: Set<string>;
      }
    >();

    // Iterate over the imports and populate the pathMap
    // This will allow us to group imports by path and type
    // and avoid duplicate imports for the same path
    imports.forEach(({ name, path, isDefault, isTypeOnly, as }) => {
      const importPath = this.resolveModulePath(path);
      const nameWithAs = as ? `${name} as ${as}` : name;
      if (!pathMap.has(importPath)) {
        pathMap.set(importPath, {
          defaultImport: new Set(),
          namedImports: new Set(),
          namedTypeImports: new Set(),
        });
      }
      if (isDefault) {
        pathMap.get(importPath)?.defaultImport?.add(nameWithAs);
      } else {
        if (isTypeOnly) {
          pathMap.get(importPath)?.namedTypeImports?.add(nameWithAs);
        } else {
          pathMap.get(importPath)?.namedImports?.add(nameWithAs);
        }
      }
    });

    // If the same name is used for both default and named imports,
    // we will not write the default import, but only the named import.
    // This is to avoid conflicts in the import statements.
    pathMap.forEach((importData, importPath) => {
      const { defaultImport, namedImports, namedTypeImports } = importData;
      namedImports.forEach((name) => {
        // If there are named imports with the same name as the default import,
        // delete the default import
        if (defaultImport.has(name)) {
          defaultImport.delete(name);
        }
        // If there are named imports with the same name as the type import,
        // delete the type import
        if (namedTypeImports.has(name)) {
          namedTypeImports.delete(name);
        }
      });

      // Write the import statements
      defaultImport.forEach((name) => {
        this.writer.writeLine(`import ${name} from '${importPath}';`);
      });
      if (namedImports.size > 0) {
        this.writer.writeLine(
          `import { ${Array.from(namedImports).join(', ')} } from '${importPath}';`,
        );
      }
      if (namedTypeImports.size > 0) {
        this.writer.writeLine(
          `import type { ${Array.from(namedTypeImports).join(', ')} } from '${importPath}';`,
        );
      }
    });
  }

  writeHeading(heading: string, type: 'SLIM' | 'FAT' = 'SLIM') {
    if (type === 'SLIM') {
      return (
        this.writer
          // .newLine()
          .writeLine(`// ${heading}`)
          .writeLine('//------------------------------------------------------')
      );
    }

    return (
      this.writer
        // .newLine()
        .writeLine('/////////////////////////////////////////')
        .writeLine(`// ${heading}`)
        .writeLine('/////////////////////////////////////////')
    );
  }

  writeJSDoc(doc?: string) {
    if (!doc) return;

    this.writer.writeLine(`/**`);
    doc.split(/\n\r?/).forEach((line) => {
      this.writer.writeLine(` * ${line.trim()}`);
    });
    this.writer.writeLine(` */`);
  }

  writeExport(exportName: string, exportPath: string) {
    this.writer.writeLine(
      `export ${exportName} from '${this.resolveModulePath(exportPath)}';`,
    );
  }
}
