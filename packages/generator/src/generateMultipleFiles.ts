import { FileWriter } from './classes';
import {
  writeArgTypeFiles,
  writeInputTypeFiles,
  writeModelFiles,
} from './functions';
import { CreateOptions } from './types';

export const generateMultipleFiles = ({ dmmf, path }: CreateOptions) => {
  const { createModelTypes, createInputTypes, writeBarrelFiles } =
    dmmf.generatorConfig;

  // Create the index file
  if (writeBarrelFiles) {
    new FileWriter().createFile(`${path}/index.ts`, ({ writeExport }) => {
      if (createModelTypes) {
        writeExport('*', './modelSchema');
      }

      writeExport('*', `./${dmmf.generatorConfig.inputTypePath}`);

      if (createInputTypes) {
        writeExport('*', `./${dmmf.generatorConfig.outputTypePath}`);
      }
    });
  }

  writeModelFiles({ path, dmmf });
  writeInputTypeFiles({ path, dmmf });
  writeArgTypeFiles({ path, dmmf });
};
