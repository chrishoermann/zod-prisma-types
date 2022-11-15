import { CodeBlockWriter } from 'ts-morph';

export const writeHeading = (
  headerString: string,
  type: 'SLIM' | 'FAT' = 'SLIM',
) =>
  type === 'SLIM'
    ? (writer: CodeBlockWriter) => {
        writer
          .newLine()
          .writeLine(`// ${headerString}`)
          .writeLine(
            '//------------------------------------------------------',
          );
      }
    : (writer: CodeBlockWriter) => {
        writer
          .newLine()
          .writeLine('/////////////////////////////////////////')
          .writeLine(`// ${headerString}`)
          .writeLine('/////////////////////////////////////////');
      };
