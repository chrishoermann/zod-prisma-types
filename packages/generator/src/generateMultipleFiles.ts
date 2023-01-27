import { FileWriter } from './classes';
import {
  writeArgTypeFiles,
  writeInputTypeFiles,
  writeModelFiles,
} from './functions';
import { CreateOptions } from './types';

export const generateMultipleFiles = ({ dmmf, path }: CreateOptions) => {
  // Create the index file
  new FileWriter().createFile(`${path}/index.ts`, ({ writeExport }) => {
    if (dmmf.generatorConfig.createModelTypes) {
      writeExport('*', './modelSchema');
    }

    writeExport('*', `./${dmmf.generatorConfig.inputTypePath}`);

    if (dmmf.generatorConfig.createInputTypes) {
      writeExport('*', `./${dmmf.generatorConfig.outputTypePath}`);
    }
  });

  // Create the model files
  writeModelFiles({ path, dmmf });

  // Create the input type files
  writeInputTypeFiles({ path, dmmf });

  // Create the arg type files
  writeArgTypeFiles({ path, dmmf });
};
