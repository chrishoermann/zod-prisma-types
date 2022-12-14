import {
  ZOD_IMPORT_STATEMENT,
  // PRIMSA_IMPORT_STATEMENT,
  getPrismaImportStatemnt,
} from '../constants/importStatements';
import { GetStatements, Statement } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getImportStatements: GetStatements = (dmmf) => {
  const statements: Statement[] = [
    ZOD_IMPORT_STATEMENT,
    getPrismaImportStatemnt(dmmf.generatorConfig.prismaClientPath),
  ];

  if (dmmf.generatorConfig.imports) {
    statements.push(...dmmf.generatorConfig.imports);
  }

  return statements;
};
