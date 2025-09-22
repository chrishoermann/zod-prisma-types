import { FileWriter } from './classes';
import {
  writeArgTypeFiles,
  writeInputTypeFiles,
  writeModelFiles,
} from './functions';
import { getConfig } from './config';

export const generateMultipleFiles = () => {
  const config = getConfig();

  // Create the index file
  if (config.writeBarrelFiles) {
    new FileWriter().createFile(
      `${config.outputPath}/index.ts`,
      ({ writeExport }) => {
        if (config.createModelTypes) {
          writeExport('*', './modelSchema');
        }

        writeExport('*', `./${config.inputTypePath}`);

        if (config.createInputTypes) {
          writeExport('*', `./${config.outputTypePath}`);
        }
      },
    );
  }

  writeModelFiles();
  writeInputTypeFiles();
  writeArgTypeFiles();
};
