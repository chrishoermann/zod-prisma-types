import { GeneratorOptions } from '@prisma/generator-helper';
import { Project } from 'ts-morph';

import { DirectoryHelper, ExtendedDMMF } from './classes';
import {
  getArgTypeStatements,
  getEnumStatements,
  getHelperStatements,
  getIncludeSelectStatements,
  getInputTypeStatements,
  getImportStatements,
  getModelStatements,
  // getAggregateAndCountStatements // currently not used in any input types
} from './functions';
import { skipGenerator, usesCustomTsConfigFilePath } from './utils';

export interface GeneratorConfig {
  output: GeneratorOptions['generator']['output'];
  config: GeneratorOptions['generator']['config'];
  dmmf: GeneratorOptions['dmmf'];
}

export const generator = async ({ output, config, dmmf }: GeneratorConfig) => {
  if (!output) throw new Error('No output path specified');

  if (await skipGenerator()) {
    return console.log(
      '\x1b[33m',
      '!!!! Generation of zod schemas skipped! Generator is disabled in "zodGenConfig.js" !!!!',
      '\x1b[37m',
    );
  }

  // extend the DMMF with custom functionality - see "classes" folder
  const extendendDMMF = new ExtendedDMMF(dmmf, config);

  // check if a custom tsconfig file is used and log an info if so
  await usesCustomTsConfigFilePath(
    extendendDMMF.generatorConfig.tsConfigFilePath,
  );

  // create ts-morph project - see: https://ts-morph.com/
  const project = new Project({
    tsConfigFilePath: extendendDMMF.generatorConfig.tsConfigFilePath,
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
        // ...getAggregateAndCountStatements(extendendDMMF), // currently not used in any input types
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
