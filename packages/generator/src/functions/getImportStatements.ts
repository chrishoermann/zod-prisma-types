import {
  ZOD_IMPORT_STATEMENT,
  PRIMSA_IMPORT_STATEMENT,
  DECIMAL_JS_IMPORT_STATEMENT,
  VALIDATOR_JS_IMPORT_STATEMENT,
} from '../constants/importStatements';
import { GetStatements, Statement } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getImportStatements: GetStatements = (datamodel) => {
  const statements: Statement[] = [
    ZOD_IMPORT_STATEMENT,
    PRIMSA_IMPORT_STATEMENT,
  ];

  if (datamodel.useDecimalJs()) {
    statements.push(DECIMAL_JS_IMPORT_STATEMENT);
  }

  if (datamodel.useValidatorJs()) {
    statements.push(VALIDATOR_JS_IMPORT_STATEMENT);
  }

  if (datamodel.config.imports) {
    statements.push(...datamodel.config.imports);
  }

  return statements;
};
