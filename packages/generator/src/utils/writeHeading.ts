import { CodeBlockWriter } from 'ts-morph';

/////////////////////////////////////////////
// FUNCITON
/////////////////////////////////////////////

/**
 * Formats a heading for the generated file.
 */

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
