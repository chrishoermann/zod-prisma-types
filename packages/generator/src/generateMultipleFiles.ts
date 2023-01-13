import { DirectoryHelper } from './classes';
import fs from 'fs';
import { CreateOptions } from './types';
import {
  writeEnumFiles,
  writeHelperFiles,
  writeInputTypeFiles,
  writeModelFiles,
} from './functions';

export const generateMultipleFiles = ({
  extendedDMMF,
  outputPath,
  project,
}: CreateOptions) => {
  // If data is present in the directory, delete it.
  // Is necessary to not have old data in the directory e.g.
  // when a model is removed from the schema.
  // needs to be syncronous because otherwise a race condition
  // when creating new files occurs.
  if (DirectoryHelper.pathOrDirExists(outputPath)) {
    try {
      fs.rmdirSync(outputPath, { recursive: true });
    } catch (err) {
      if (err instanceof Error)
        throw new Error(`Error while deleting old data: ${err.message}`);
    }
  }

  // Create the path specified in the generator output
  DirectoryHelper.createDir(outputPath);

  const indexSource = project.createSourceFile(`${outputPath}/index.ts`);

  indexSource.addExportDeclarations([
    {
      namespaceExport: '',
      moduleSpecifier: './enums',
    },
    {
      namespaceExport: '',
      moduleSpecifier: './helpers',
    },
    {
      namespaceExport: '',
      moduleSpecifier: './models',
    },
    {
      namespaceExport: '',
      moduleSpecifier: './inputTypes',
    },
  ]);

  indexSource.organizeImports();

  writeHelperFiles({ outputPath, project, extendedDMMF });

  writeEnumFiles({ outputPath, project, extendedDMMF });

  writeModelFiles({ outputPath, project, extendedDMMF });

  writeInputTypeFiles({ outputPath, project, extendedDMMF });

  // format the source file
  indexSource.formatText({
    indentSize: 2,
    convertTabsToSpaces: true,
    ensureNewLineAtEndOfFile: true,
  });

  // save the source file and apply all changes
  return project.save();
};
