import { GeneratorOptions } from '@prisma/generator-helper';

import { DirectoryHelper, ExtendedDMMF } from './classes';
import { generateMultipleFiles } from './generateMultipleFiles';
import { generateSingleFile } from './generateSingleFile';
import { skipGenerator } from './utils';

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

  // If data is present in the output directory, delete it.
  // This is necessary to not have old data in the directory e.g.
  // when a model is removed from the schema the old files would still be present.
  // needs to be syncronous because otherwise a race condition occurs
  // when creating new files.

  DirectoryHelper.removeDir(output.value);

  // generate single or multiple files
  if (extendedDMMF.generatorConfig.useMultipleFiles) {
    return generateMultipleFiles({
      dmmf: extendedDMMF,
      outputPath: output.value,
    });
  }

  return generateSingleFile({
    dmmf: extendedDMMF,
    outputPath: output.value,
  });
};
