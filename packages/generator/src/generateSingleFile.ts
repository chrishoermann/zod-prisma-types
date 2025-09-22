import { FileWriter } from './classes';
import {
  writeSingleFileEnumStatements,
  writeSingleFileHelperStatements,
  writeSingleFileImportStatements,
  writeSingleFileModelStatements,
  writeSingleFileTypeStatements,
  writeSingleFileIncludeSelectStatements,
  writeSingleFileInputTypeStatements,
  writeSingleFileArgTypeStatements,
} from './functions';
import { getConfig } from './config';

export const generateSingleFile = () => {
  const { outputPath } = getConfig();

  new FileWriter().createFile(`${outputPath}/index.ts`, (fileWriter) => {
    writeSingleFileImportStatements(fileWriter);
    writeSingleFileHelperStatements(fileWriter);
    writeSingleFileEnumStatements(fileWriter);
    writeSingleFileModelStatements(fileWriter);
    writeSingleFileTypeStatements(fileWriter);
    writeSingleFileIncludeSelectStatements(fileWriter);
    writeSingleFileInputTypeStatements(fileWriter);
    writeSingleFileArgTypeStatements(fileWriter);
  });
};
