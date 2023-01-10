import { DirectoryHelper, ExtendedDMMF } from '../classes';
import { CreateOptions } from '../types';
import { SourceFile } from 'ts-morph';

/////////////////////////////////////////////////
// TYPES
/////////////////////////////////////////////////

interface WriteFileParams {
  name: string;
  writeStatement: (source: SourceFile) => void;
}

interface UseWriterParams {
  extendedDMMF: ExtendedDMMF;
  writeFile: (params: WriteFileParams) => void;
}

interface MultiFileIndexWrapperOptions extends CreateOptions {
  /**
   * Path to the sub directory that should be created and where the index file should be located
   */
  subPath: string;
  useWriter: (params: UseWriterParams) => void;
}

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

/**
 * Function is used to abstract away repetitive code for writing multiple files
 *
 */
export const multiFileWriter = ({
  extendedDMMF,
  outputPath,
  subPath,
  project,
  useWriter,
}: MultiFileIndexWrapperOptions) => {
  // create the path specified in the generator output
  // and add the subPath that should be used for the files
  const path = DirectoryHelper.createDir(`${outputPath}/${subPath}`);

  if (path) {
    // create an index source barrel file where all the exports are added
    const indexSource = project.createSourceFile(`${path}/index.ts`);

    // call the useWriter function that provides all the necessary information
    // and tools that are needed to write the files (extendedDMMF, writeFile function)
    useWriter({
      extendedDMMF,

      // writeFile function is called for each element when
      // iterating over models, enums, etc.
      writeFile: ({ name, writeStatement }) => {
        // add the export declaration to the index file
        indexSource.addExportDeclaration({
          namedExports: [`${name}Schema`],
          moduleSpecifier: `./${name}Schema`,
        });

        // create the source file for the current element
        const source = project.createSourceFile(`${path}/${name}Schema.ts`);

        // call the writeStatement function where
        // the actual writing of the file happens
        writeStatement(source);

        // format the source file
        source.formatText({
          indentSize: 2,
          convertTabsToSpaces: true,
          ensureNewLineAtEndOfFile: true,
        });
      },
    });

    // organize the imports in the index file to be sorted from A-Z
    indexSource.organizeImports();

    // format the index file
    indexSource.formatText({
      indentSize: 2,
      convertTabsToSpaces: true,
      ensureNewLineAtEndOfFile: true,
    });
  } else {
    throw new Error(`Could not create directory: ${path}`);
  }
};
