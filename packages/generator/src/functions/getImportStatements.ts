import {
  ZOD_IMPORT_STATEMENT,
  PRIMSA_IMPORT_STATEMENT,
  VALIDATOR_JS_IMPORT_STATEMENT,
} from '../constants/importStatements';
import { GetStatements, Statement } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getImportStatements: GetStatements = (dmmf) => {
  const statements: Statement[] = [
    ZOD_IMPORT_STATEMENT,
    PRIMSA_IMPORT_STATEMENT,
  ];

  if (dmmf.generatorConfig.useValidatorJs) {
    statements.push(VALIDATOR_JS_IMPORT_STATEMENT);
  }

  if (dmmf.generatorConfig.imports) {
    statements.push(...dmmf.generatorConfig.imports);
  }

  return statements;
};
