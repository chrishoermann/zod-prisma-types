/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
    console.log('use validator', datamodel.config);
    statements.push(VALIDATOR_JS_IMPORT_STATEMENT);
  }

  return statements;
};
