import { getPrismaImportStatemnt, ZOD_IMPORT_STATEMENT } from '../constants';
import { DirectoryHelper } from '../classes';
import { CreateFiles } from '../types';
import { getHelperStatements } from './getHelperStatements';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

// needs: extendedDMMF, path, project

export const writeHelperFiles: CreateFiles = async ({
  extendedDMMF,
  outputPath,
  project,
}) => {
  DirectoryHelper.createDir(`${outputPath}/helpers`);

  const statements = getHelperStatements(extendedDMMF);

  project.createSourceFile(`${outputPath}/helpers/index.ts`, {
    statements: [
      ZOD_IMPORT_STATEMENT,
      getPrismaImportStatemnt(extendedDMMF.generatorConfig.prismaClientPath),
      ...statements,
    ],
  });
};
