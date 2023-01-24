import {
  ZOD_IMPORT_STATEMENT,
  // PRIMSA_IMPORT_STATEMENT,
  getPrismaImportStatement,
} from '../constants/DEPR_importStatements';
import { GetStatements, Statement } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getImportStatements: GetStatements = (dmmf) => {
  const statements: Statement[] = [
    ZOD_IMPORT_STATEMENT,
    getPrismaImportStatement(dmmf.generatorConfig.prismaClientPath),
  ];

  if (dmmf.generatorConfig.imports) {
    statements.push(...dmmf.generatorConfig.imports);
  }

  return statements;
};
