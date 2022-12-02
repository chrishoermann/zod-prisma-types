import { generatorHandler } from '@prisma/generator-helper';
import { Project } from 'ts-morph';

import { DirectoryHelper } from './classes/directoryHelper';
import { ExtendedDMMF } from './classes/extendedDMMF';
import {
  getArgTypeStatements,
  getEnumStatements,
  getHelperStatements,
  getIncludeSelectStatements,
  getInputTypeStatements,
  getImportStatements,
  getModelStatements,
} from './functions';

generatorHandler({
  onManifest: () => {
    return {
      defaultOutput: './generated/zod',
      prettyName: 'Zod Prisma Types',
    };
  },
  onGenerate: async (options) => {
    const path = options.generator.output;

    if (!path) throw new Error('No output path specified');

    // extend the DMMF with custom functionality - see in "classes" folder
    const extendendDMMF = new ExtendedDMMF(options.dmmf);

    // create ts-morph project - see: https://ts-morph.com/
    const project = new Project({
      tsConfigFilePath: './tsconfig.json',
      skipAddingFilesFromTsConfig: true,
    });

    // Create the path specified in the generator output
    DirectoryHelper.pathExistsElseCreate(path.value);

    // create the source file containing all zod types
    const indexSource = project.createSourceFile(
      `${path.value}/index.ts`,
      {
        statements: [
          ...getImportStatements(extendendDMMF),
          ...getEnumStatements(extendendDMMF),
          ...getHelperStatements(extendendDMMF),
          ...getModelStatements(extendendDMMF),
          ...getIncludeSelectStatements(extendendDMMF),
          ...getInputTypeStatements(extendendDMMF),
          ...getArgTypeStatements(extendendDMMF),
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
  },
});
