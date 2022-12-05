import { GeneratorOptions } from '@prisma/generator-helper';
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

export interface GeneratorConfig {
  output: GeneratorOptions['generator']['output'];
  config: GeneratorOptions['generator']['config'];
  dmmf: GeneratorOptions['dmmf'];
}

export const generator = async ({ output, config, dmmf }: GeneratorConfig) => {
  if (!output) throw new Error('No output path specified');

  console.log('config: ', config);

  // extend the DMMF with custom functionality - see "classes" folder
  const extendendDMMF = new ExtendedDMMF(dmmf, config);

  // create ts-morph project - see: https://ts-morph.com/
  const project = new Project({
    tsConfigFilePath: './tsconfig.json',
    skipAddingFilesFromTsConfig: true,
  });

  // Create the path specified in the generator output
  DirectoryHelper.pathExistsElseCreate(output.value);

  // create the source file containing all zod types
  const indexSource = project.createSourceFile(
    `${output.value}/index.ts`,
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
};
