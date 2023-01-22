import CodeBlockWriter from 'code-block-writer';

export const writeExport = (
  writer: CodeBlockWriter,
  importName: string,
  importPath: string,
) => {
  writer.writeLine(`export ${importName} from '${importPath}'`);
};
