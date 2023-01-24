import CodeBlockWriter from 'code-block-writer';

export const writeImport = (
  writer: CodeBlockWriter,
  importName: string,
  importPath: string,
) => {
  writer.writeLine(`import ${importName} from '${importPath}'`);
};
