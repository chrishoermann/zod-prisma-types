import { Project } from 'ts-morph';
import { DirectoryHelper, ExtendedDMMF } from './classes';
import {
  getImportStatements,
  getEnumStatements,
  getHelperStatements,
  getModelStatements,
  getIncludeSelectStatements,
  getInputTypeStatements,
  getArgTypeStatements,
} from './functions';

interface CreateOptions {
  extendedDMMF: ExtendedDMMF;
  outputPath: string;
  project: Project;
}

export const generateSingleFile = ({
  extendedDMMF,
  outputPath,
  project,
}: CreateOptions) => {
  // Create the path specified in the generator output
  DirectoryHelper.pathExistsElseCreate(outputPath);

  // create the source file containing all zod types
  const indexSource = project.createSourceFile(
    `${outputPath}/index.ts`,
    {
      statements: [
        ...getImportStatements(extendedDMMF),
        ...getEnumStatements(extendedDMMF),
        ...getHelperStatements(extendedDMMF),
        ...getModelStatements(extendedDMMF),
        ...getIncludeSelectStatements(extendedDMMF),
        // ...getAggregateAndCountStatements(extendedDMMF), // currently not used in any input types
        ...getInputTypeStatements(extendedDMMF),
        ...getArgTypeStatements(extendedDMMF),
      ],
    },
    {
      overwrite: true,
    },
  );

  // format the source file
  indexSource.formatText({
    indentSize: 2,
    convertTabsToSpaces: true,
    ensureNewLineAtEndOfFile: true,
  });

  // save the source file and apply all changes
  return project.save();
};
