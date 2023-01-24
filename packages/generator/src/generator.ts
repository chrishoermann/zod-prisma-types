import { GeneratorOptions } from '@prisma/generator-helper';
import { Project } from 'ts-morph';

import { ExtendedDMMF } from './classes';
import { generateMultipleFiles } from './generateMultipleFiles';
import { generateSingleFile } from './generateSingleFile';
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
  const extendedDMMF = new ExtendedDMMF(dmmf, config);

  // check if a custom tsconfig file is used and log an info if so
  await usesCustomTsConfigFilePath(
    extendedDMMF.generatorConfig.tsConfigFilePath,
  );

  // create ts-morph project - see: https://ts-morph.com/
  const project = new Project({
    tsConfigFilePath: extendedDMMF.generatorConfig.tsConfigFilePath,
    skipAddingFilesFromTsConfig: true,
  });

  // generate single or multiple files
  if (extendedDMMF.generatorConfig.useMultipleFiles) {
    return generateMultipleFiles({
      extendedDMMF,
      outputPath: output.value,
    });
  }

  return generateSingleFile({
    extendedDMMF,
    outputPath: output.value,
    project,
  });
};
