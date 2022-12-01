/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ZOD_IMPORT_STATEMENT, PRIMSA_IMPORT_STATEMENT } from '../constants';
import { GetStatements } from '../types';

/////////////////////////////////////////////////
// FUNCTION
/////////////////////////////////////////////////

export const getImportStatements: GetStatements = () => {
  return [PRIMSA_IMPORT_STATEMENT, ZOD_IMPORT_STATEMENT];
};
